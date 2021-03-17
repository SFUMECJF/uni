-- COMP3311 20T3 Final Exam
-- Q1: longest album(s)

-- ... helper views (if any) go here ...

create or replace view q1("group",album,year)
as

    select groups.name, albums.title, Albums.year 
    from albums
    join groups on albums.made_by = groups.id
    join songs on albums.id = songs.on_album
    group by albums.id, groups.name
    order by sum(songs.length) desc limit 1
;

