-- COMP3311 20T3 Final Exam
-- Q4: list of long and short songs by each group

-- ... helper views and/or functions (if any) go here ...

drop function if exists q4();
drop type if exists SongCounts;
create type SongCounts as ( "group" text, nshort integer, nlong integer );

create or replace function
	q4Helper(_songLength integer, _bName text) returns integer
as $$
	declare songLength integer := $1;
	declare bName text := $2;
begin	
	if songLength = 3 then
		return (
			select count(songs.id)::integer 
			from groups
			join albums on groups.id = albums.made_by
			join songs on albums.id = songs.on_album and songs.length < (songLength * 60)
			where groups.name like bName
		);
	else 
		return (
			select count(songs.id)::integer 
			from groups
			join albums on groups.id = albums.made_by
			join songs on albums.id = songs.on_album and songs.length > (songLength * 60)
			where groups.name like bName
		);
	end if;
end;
$$ language plpgsql
;

create or replace function
	q4() returns setof SongCounts
as $$

begin
	return query

	select groups.name::text, q4Helper(3, groups.name)::integer, q4Helper(6, groups.name)::integer from groups;

end;
$$ language plpgsql
;
