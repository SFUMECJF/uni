# COMP3311 20T3 Ass3 ... Python helper functions
# by John Dao z5258962
# November 2020 20T2
# add here any functions to share between Python scripts 

# standard imports
import sys
import psycopg2

db = psycopg2.connect("dbname=imdb")
cur = db.cursor()

# checks if the query contains regex so that appropriate measures can be taken
# for the search query
def checkRegex(query):
    regex = ['^', '$', '[', ']']
    isRegex = False
    for c in query:
        if c in regex:
            isRegex = True
            break
    return isRegex

# cleans the query of any characters that may affect the search
# e.g apostrophe
def cleanQuery(query):
    if "'" in query:
        query = query.translate(str.maketrans({"'":"''"}))
    return query

# given a query string, will return a list of results. that contain
# title start_year and id
def queryMovieSearch(query):
    # cleaning the query and determining if a 
    # search with string or regex is being made
    query = cleanQuery(query)
    searchQuery =''
    if checkRegex(query): 
        searchQuery = "WHERE title ~* '" + query + "'"
    else:
        searchQuery = "WHERE title iLIKE " + "'%" + query + "%'"

    cur.execute("SELECT title, start_year, id\
                FROM movies\
                %s" % searchQuery +
                "ORDER BY start_year ASC, title ASC")

    return cur.fetchall()

# returns a movie search result based on query and year
def queryMovieSearchYear(query, year):
    # cleaning the query and determining if a 
    # search with string or regex is being made
    query = cleanQuery(query)
    searchQuery =''
    if checkRegex(query): 
        searchQuery = "WHERE title ~* '" + query + "' AND start_year = " 
    else:
        searchQuery = "WHERE title iLIKE " + "'%" + query + "%' AND start_year ="
    
    cur.execute("SELECT title, start_year, id\
                 FROM movies\
                 %s " % searchQuery + year +
                 "ORDER BY start_year ASC, title ASC")
    return cur.fetchall()

# given movie ID, type of staff and column will return all the people related
# works to get cast listings for a movieID
def getStaff(movieID, type, subText):
    cur.execute("SELECT names.name, %s_roles.%s\
                 FROM %s_roles\
                 INNER JOIN names ON %s_roles.name_id = names.id\
                 INNER JOIN principals ON names.id = principals.name_id\
                 WHERE %s_roles.movie_id = %s AND principals.movie_id = %s\
                 ORDER BY ordering ASC, %s_roles.%s ASC" % (type, subText, type, type, type, movieID, movieID, type, subText))
    return cur.fetchall()


# returns 2 lists of crew roles and acting roles 
def getCast(movieID):
    return getStaff(str(movieID), 'crew', 'role'), getStaff(str(movieID), 'acting', 'played')

# searches for individual given query
def getPeople(query):
    # clean query and prepare to search
    query = cleanQuery(query)
    searchQuery =''
    # regex or no regex
    if checkRegex(query): 
        searchQuery = "WHERE name ~* '" + query + "'"
    else:
        searchQuery = "WHERE name iLIKE '%" + query + "%'"

    # gets all of the individuals 
    # including fields of birth year death year and nameid
    cur.execute("SELECT names.name, birth_year, death_year, names.id\
                 FROM names\
                 %s" % searchQuery +\
                 "ORDER BY names.name, birth_year, names.id")
    
    return cur.fetchall()

# searches for individual given query
def getPeopleYear(query, year):
    # clean query and prepare to search
    query = cleanQuery(query)
    searchQuery =''

    # regex or no regex
    # searches accordingly
    if checkRegex(query): searchQuery = "WHERE name ~* '" + query + "' AND birth_year ="
    else: searchQuery = "WHERE name iLIKE '%" + query + "%' AND birth_year ="
    
    cur.execute("SELECT names.name, birth_year, death_year, names.id\
                 FROM names\
                 %s" % searchQuery + year +\
                 "ORDER BY names.name, birth_year, names.id")
    
    return cur.fetchall()

# given nameid will get all film roles related to a certain nameID
# creates a table that contains all of the roles that nameID plays
# then matches it up with movies to add movie names
# and then links it up with principals to get all roles nameID was principal in
# gets all roles associated with given person
# person data inclues name, birth year, death year and nameID
def getRoles(nameID):
    cur.execute("SELECT title, start_year, cRole, aRole, allRoles.name_id, allRoles.movie_id FROM\
                    (SELECT movie_id, crew_roles.role as cRole, null as aRole, name_id FROM crew_roles\
                    WHERE name_id = %s\
                    UNION\
                    SELECT movie_id, null as cRole, acting_roles.played as aRole, name_id FROM acting_roles\
                    WHERE name_id = %s\
                    ) as allRoles\
                 INNER JOIN movies ON (allRoles.movie_id = movies.id)\
                 INNER JOIN principals ON (allRoles.name_id = principals.name_id AND allRoles.movie_id = principals.movie_id)\
                 ORDER BY start_year, title, aRole, cRole" % (nameID, nameID)) 
    
    return cur.fetchall()

