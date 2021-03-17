-- COMP3311 20T3 Final Exam
-- Q1: view of teams and #matches

-- ... helper views (if any) go here ...

create or replace view Q1(team,nmatches)
as
    select country as team, count(Matches.id) FROM teams
    join involves on teams.id = involves.team
    join Matches on involves.match = matches.id
    group by teams.id
    ORDER BY count(Matches.id) DESC
;

