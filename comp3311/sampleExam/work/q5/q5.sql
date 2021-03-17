-- COMP3311 20T3 Final Exam
-- Q5: show "cards" awarded against a given team

drop function if exists q5(text);
drop type if exists RedYellow;

create type RedYellow as (nreds integer, nyellows integer);
-- ... helper views and/or functions go here ...

-- returns id of team given a name
create or replace function
	Q5Helper(_teamnNme text) returns integer
as $$
	declare teamName text := $1;
begin

	return (
		select teams.id from teams where teams.country = teamName
	);

end;

$$ language plpgsql
;

-- given a team id and type of card, will return number
create or replace function
	countCards(_team text, _cardType text) returns integer
as $$

	-- declaration to store inputs 
	declare teamID integer := Q4Helper($1);
	declare cardColour text := $2;

begin

	if teamID is NULL then	
		return -1;
	else
		return (
			SELECT count(cards.id)::integer from involves
			join players on teamID = players.memberOf
			join cards on involves.match = cards.givenIn and cardColour = cards.cardType and players.Id = cards.givenTo
			where involves.team = teamID
		);
	end if;

end;

$$ language plpgsql
;

create or replace function
	Q5(_team text) returns RedYellow
as $$

	declare red integer := countCards($1, 'red');
	declare yellow integer := countCards($1, 'yellow');

begin
	if red < 0 then
		return (row(null, null)::RedYellow);
	else
		return (row(red, yellow)::RedYellow);
	end if;
	
end;
$$ language plpgsql
;
