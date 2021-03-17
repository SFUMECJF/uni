-- COMP3311 20T3 Final Exam
-- Q4: function that takes two team names and
--     returns #matches they've played against each other

-- ... helper views and/or functions (if any) go here ...

create or replace function
	Q4Helper(_teamnNme text) returns integer
as $$
	declare teamName text := $1;
begin

	return (
		select teams.id from teams where teams.country = teamName
	);

end;

$$ language plpgsql
;

create or replace function
	countMatches(_team1 text, _team2 text) returns integer
as $$
	-- declaration to store inputs 
	declare team1 integer := Q4Helper($1);
	declare team2 integer := Q4Helper($2);
begin

	if team1 is NULL then	
		return -1;
	elsif team2 is NULL then
		return -1;
	else
		return (
			select count(matches.id)::integer from matches
			join involves as involves1 on matches.id = involves1.match and involves1.team = team1
			join involves as involves2 on matches.id = involves2.match and involves2.team = team2
			where (involves1.team = team1) and (involves2.team = team2)
		);
	end if;

end;

$$ language plpgsql
;

create or replace function
	Q4(_team1 text, _team2 text) returns integer
as $$
	-- declaration to store inputs 
	declare counted integer := countMatches($1, $2);

begin
	if counted > -1 then
		return counted;
	else 
		return null;
	end if;

end;

$$ language plpgsql
;

