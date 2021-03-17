-- COMP3311 20T3 Final Exam
-- Q5: find genres that groups worked in

-- ... helper views and/or functions go here ...

drop function if exists q5();
drop type if exists GroupGenres;

create type GroupGenres as ("group" text, genres text);

-- given name will return group id
create or replace function
    q5GetGroupId(_bName text) returns integer
as $$
    declare bName text := $1;

begin
    return (
        select groups.id from groups
        where groups.name like bName
    );

end;
$$ language plpgsql
;

-- given name of band, will return all genres as long string
create or replace function
    q5Helper(_bName text) returns text
as $$
    declare bName text := $1;

begin

    return (
        select string_agg(distinct albums.genre::text, ',') as allgenres
        from albums
        where albums.made_by = q5GetGroupId(bName)
    );

end;
$$ language plpgsql
;


create or replace function
    q5() returns setof GroupGenres
as $$

begin
    return query

    select groups.name::text, q5Helper(groups.name)::text from groups;

end;
$$ language plpgsql
;

