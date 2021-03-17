-- COMP3311 20T3 Final Exam
-- Q2: view of amazing goal scorers

-- ... helpers go here ...

create or replace view Q2(player,ngoals)
as
    select players.name as player, count(Goals.id) as ngoals from players
    join goals on players.id = goals.scoredby and goals.rating = 'amazing'
    group by players.id
    having count(goals.id) > 1
    order by count(goals.id) desc
;

