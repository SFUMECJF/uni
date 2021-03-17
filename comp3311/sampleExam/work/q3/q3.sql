-- COMP3311 20T3 Final Exam
-- Q3: team(s) with most players who have never scored a goal

-- creates a view with players with no goals
create or replace view Q3Helper(player, team)
as
    select players.id, teams.id from players
    join teams on players.memberOf = teams.id
    where not exists (select null from goals where players.id = goals.scoredby)

;

create or replace view Q3(team,nplayers)
as

    select teams.country as team, count(Q3Helper.player) from teams
    join Q3Helper on teams.id = Q3Helper.team
    group by teams.id
    order by count(Q3Helper.player) desc limit 1
    --having count(goals.id) = 0
    --order by count(players.id) desc LIMIT 1 
;


