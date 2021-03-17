-- COMP3311 20T3 Assignment 2
-- By John Dao z5258962, 
-- Created NOV 2020


-- Q1: students who've studied many courses (over 65 courses)

create or replace view Q1(unswid,name)
as
   select unswid, name 
   from people, course_enrolments
-- select student and return all students with over 65 courses
   where course_enrolments.student = people.id
   group by unswid, name
   having count(student) > 65
;

-- Q2: numbers of students, staff and both

create or replace view Q2(nstudents,nstaff,nboth)
as
   select
   -- number of students via id from students
   (select count(id) from people where(id in (select id from students))) as nstudents,
   -- number of staff via id from staff
   (select count(id) from people where (id in (select id from staff))) as nstaff,
   -- number of both by adding via and from student and staff
   (select count(id) from people where ((id in (select id from students) 
      and id in (select id from staff)))) as nboth
;

-- Q3: prolific Course Convenor(s). The staff member with the most courses taught

create or replace view Q3Helper(name,ncourses)
as
   -- Selects name and number of courses and joins them onto course staff with
   -- correct role
   select people.name, count(course_staff.course) as ncourses 
   from course_staff 
   join staff_roles on staff_roles.id = course_staff.role 
   and staff_roles.name = 'Course Convenor'
   
   --  joins the person by name and the number of courses 
   -- they've worked for and orders them by number of courses done
   -- Removes all but the highest number
   join people on people.id = course_staff.staff 
   group by people.name
   order by count(course_staff.course) desc
;

create or replace view Q3(name,ncourses)
as
   -- Selects name and number of courses and joins them onto course staff with
   -- correct role
   select *
   from Q3Helper
   where ncourses = (select max(ncourses) from Q3Helper)

;

-- Q4: Comp Sci students in 05s2 and 17s1

create or replace view Q4a(id,name)
as
select people.unswid as id, people.name as name from programs
   -- joins all required data
   join program_enrolments on programs.id = program_enrolments.program
   join terms on program_enrolments.term = terms.id
   join people on program_enrolments.student = people.id
   -- requirements to pass Q4a
   where programs.code = '3978' 
         and terms.year = '2005' 
         and terms.session = 'S2';

create or replace view Q4b(id,name)
as
select people.unswid as id, people.name as name from programs
   -- joins all required data
   join program_enrolments on programs.id = program_enrolments.program
   join terms on program_enrolments.term = terms.id
   join people on program_enrolments.student = people.id
   -- requirements to pass Q4b
   where programs.code = '3778' 
         and terms.year = '2017' 
         and terms.session = 'S1';
;

-- Q5: most "committee"d faculty
create or replace view Q5helper(name, nFac)
as
   select name, count(orgunits.name) as nFac
   from orgunits
   -- joins to get names of all possible
   join orgunit_groups on orgunit_groups.member = orgunits.id
   -- joins to get all org faculties
   join (select facultyOf(orgunit_groups.owner) as committees 
            from orgunits
            -- get all committees with type name 'committee'
            inner join orgunit_types on orgunit_types.id = orgunits.utype
            join orgunit_groups on orgunit_groups.member = orgunits.id
            where orgunit_types.name = 'Committee'
         )
   -- join on temp table
   as temp on temp.committees = orgunits.id

   -- get the highest
   group by orgunits.name order by count(orgunits.name)
;

create or replace view Q5(name)
as
   -- shows the view with faculties with the most committies via Q5helper
   select name
   from Q5helper
   where nFac = (select max(nFac) from Q5helper)
;

-- Q6: nameOf function

create or replace function
   Q6(id integer) returns text
as $$
   -- simple or statement to use either people.id or people.unswid
   select name 
   from people 
   where id = $1 or unswid = $1

$$ language sql;

-- Q7: offerings of a subject

create or replace function
   Q7(subject text)
     returns table (subject text, term text, convenor text)
as $$
   
   select $1 as subject, termname(terms.id), Q6(course_staff.staff) from people

   join course_staff on people.id = course_staff.staff
   join courses on course_staff.course = courses.id
   join subjects on courses.subject = subjects.id
   join terms on courses.term = terms.id
   join staff_roles on staff_roles.id = course_staff.role 
	where staff_roles.name = 'Course Convenor' and subjects.code = $1;

$$ language sql;

-- Q8: transcript

create or replace function
   Q8(zid integer) returns setof TranscriptRecord
as $$
   
declare
   -- declarations needed for record and
   -- to calculate wam appropriately
   rec TranscriptRecord;
   wamValue decimal := 0;
   UOCpassed integer := 0;
   UOCattempted integer := 0;
   wSum integer := 0;
   track integer;
begin

   -- get student record from database.
   select students.id into track
   from students
   join people on students.id = people.id
   where people.unswid = $1;
   if (not found) then
                raise EXCEPTION 'Invalid student %',$1;
   end if;

   for rec in
   -- building record for each transcript in order of requested
   -- code, term, prog, name, mark, grade, uoc
      select subjects.code, -- code
               termname(terms.id),  -- term
                min(programs.code), -- prog
                substr(subjects.name, 1, 20), -- name
                course_enrolments.mark,  -- mark
                course_enrolments.grade, -- grade
                subjects.uoc -- uoc
      -- all joins required to get all necessary attributes
      from people
         join students on people.id = students.id
         join course_enrolments on students.id = course_enrolments.student
         join courses on course_enrolments.course = courses.id
         join subjects on courses.subject = subjects.id
         join program_enrolments on program_enrolments.student = people.id
         join terms on courses.term = terms.id and program_enrolments.term = terms.id
         join programs on programs.id = program_enrolments.program
      where people.unswid = $1
      group by terms.starting, subjects.code, terms.year, terms.session, programs.code, 
               subjects.name, course_enrolments.mark, course_enrolments.grade, subjects.uoc, terms.id
      order by terms.starting, subjects.code
   loop
      -- there is a valid grade to calculate
      -- whether that is pass/fail doesn't matter
      if (rec.mark is not null and rec.grade != 'SY') then

         -- Check if grade is a pass. Includes old grades of PT, A, B and C
         if (rec.grade in ('PC', 'PS', 'CR', 'DN', 'HD', 'PT', 'A', 'B', 'C')) then
            -- increments passed UOC 
            UOCpassed := UOCpassed + rec.uoc;
         end if;
         
         UOCattempted := UOCattempted + rec.uoc;
         wSum := wsum + (rec.mark * rec.uoc);

         -- else then the grade must be a fail
         -- set passed uoc to null
         if (rec.grade not in ('PC', 'PS', 'CR', 'DN', 'HD', 'PT', 'A', 'B', 'C', 'SY')) then
            rec.uoc := null;
         end if;
      -- SY or T grade with no change to WAM calculation meaning
      -- UOC attempted and mark is unchanged as it is null

      elsif (rec.grade = 'SY' or rec.grade = 'T') then
            -- includes into UOC passed ONLY
            UOCpassed := UOCpassed + rec.uoc;

      -- only other option is that there are null marks. If there are
      -- null marks, there are null grades
      else 
            rec.uoc = null;
      end if;
      -- send the query/record.
      return next rec;
   end loop;
   -- if no courses completed at the end of the transcript add
   -- (null, null, null, 'no wam avaliable', null, null, null)
   if (UOCattempted = 0 or UOCattempted = null) then
         rec := (null, null, null, 'No WAM avaliable', null, null, null);
   -- calculation of wam if units have been completed regardless of 
   -- pass or fail
   -- transcript written as 
   -- (null, null, null, 'Overall WAM/UOC', wamValue, null, UOCpassed)
   else
         wamValue := (wSum * 1. / UOCattempted);
         rec := (null, null, null, 'Overall WAM/UOC', wamValue, null, UOCpassed);
   
   end if;
   -- send the last record for wam
   return next rec;

end;
$$ language plpgsql
;

-- Q9: members of academic object group
create or replace function Q9helper(gid integer) returns setof AcObjRecord
as $$

declare
   -- declarations based on acad_object_groups
   -- acad_object_groups(id, name, gtype, glogic, 
   -- gdefby, negated, parent, definition)
   rec AcObjRecord;
   id integer := 0; -- id int
   name text := null; -- name LongName
   gtype text := null;  -- gtype shortName
   glogic text := null; -- glogic shortname
   gdefby text := null; -- gdefby shortname
   def text := null; -- definition

   defList text[] = null;
   codeList text[] = null;
   numberList int[] = null;
   regex text = null;
   code text = null;
   intMax int = null;
   intMin int = null;
   intRange text = null;
   testCode text = null;
   codeCompare text = null;
   tempString text = null;
   x integer;
begin
   -- required selects
   select AOG.definition, AOG.gdefby, AOG.gtype, AOG.id 
   into def, gdefby, gtype, id
   from acad_object_groups AOG where AOG.id = $1;

   -- empty return for null and non enumerated string
   if (def is null and gdefby != 'enumerated') then
      return;
   
   -- empty string return for unwanted formats
   elsif (def like '%FREE%' or def like '%GEN%' or def like '%F=%') then
      return;

   elsif (gdefby = 'enumerated') then
         -- program enumerated
         if (gtype = 'program') then
            -- collects code via joins to  respective type
            for code in
               select distinct prog.code
               -- joins to get required code data
               from Acad_object_groups AOG
                  join program_group_members PGM on (SGM.ao_group = AOG.id)
                  join programs prog on (prog.id = SGM.program)
               -- gets where id is equal or its parent is
               where AOG.id = $1 or AOG.parent = $1
            loop 
               rec := (gtype, code);
               return next rec;
            end loop;

         -- stream enumerated
         elsif (gtype = 'stream') then

            for code in
               select distinct stre.code
               from Acad_object_groups AOG
                  join stream_group_members SGM on (SGM.ao_group = AOG.id)
                  join streams stre on (stre.id = SGM.stream)
               where AOG.id = $1 or AOG.parent = $1
            loop 
               rec := (gtype, code);
               return next rec;
            end loop;
         -- else has to be subject
         -- same thing as above
         else 
            for code in
               select distinct subj.code
               from Acad_object_groups AOG
                  join subject_group_members SBGM on (SBGM.ao_group = AOG.id)
                  join subjects subj on (subj.id = SBGM.subject)
               where AOG.id = $1 or AOG.parent = $1
            loop 
               rec := (gtype, code);
               return next rec;
            end loop;
         end if;
   -- final gtype expansion into final answers
   else
      -- initial split to get first regex
      select regexp_split_to_array(def, ',') into defList;
      foreach regex in array defList 
      loop
         -- regex requiring {} braces
         if (regex like '%{%' and regex like '%}%') then
            select regexp_split_to_array(regex, ';') into codeList;
            foreach code in array codeList
            loop
               -- removes {} and loops through all of the splits
               code := replace(code, '{', '');
               code := replace(code, '}', '');
               -- adds the record
               rec := (gtype, code);
               return next rec; 
            end loop; 
         -- given range for regex to substitute
         elsif (regex like '%[%]%') then
            --preparing regex for comparison and int extraction
            -- removing brackets
            regex := replace(regex,'[',',');
            regex := replace(regex,']',',');
            regex := replace(regex,'#','%');
            -- geting the range string.
            intRange := split_part(regex,',', 2);
            -- range
            if (intRange like '%-%') then
                  -- gets minimum value within the range [x-y]
                  intMin := split_part(intRange,'-', 1)::integer;
                  intMax := split_part(intRange,'-', 2)::integer;

                  -- loops through all the numbers
                  for k in intMin..intMax
                  loop
                     -- substitutes the range into the code to 
                     --find within the database
                     testCode := replace(regex, ',' ||intRange|| ',', k::text);
                     for code in
                     select distinct s.code as code from subjects s 
                     where s.code = testCode order by s.code
                     loop
                        -- adds record if it is found
                        rec := (gtype, code);
                        return next rec; 
                     end loop;
                  end loop;

            -- no range. only a set of sepecific numbers
            else 
               select regexp_split_to_array(intRange, '\s*') into numberList;
               
               -- goes through the listed numbers required
               foreach x in array numberList
               loop
                  -- replaces and goes through all numbers in numberlist
                  testCode := replace(regex, ','||intRange||',', x::text);
                  
                  -- adds record if it is found in the database
                  for code in
                  select distinct s.code as code from subjects s
                  where s.code = testCode order by s.code
                  loop
                     rec := (gtype, code);
                        return next rec; 
                  end loop;
               end loop;
            end if;

         --(...|...) regex format
         -- UNTESTED. UNSURE IF WORKING OR NOT
         elsif (regex like '%(%)%') then
         -- prepare regex for (...|...) format
            code := split_part(regex, ')', 2);
            tempString := replace(regex, code, '');
            code := replace(code '#', '%');

            -- remove brackets
            tempString := replace(tempString, '(', '');
            tempString := replace(tempString, ')', '');

            -- split via the | character to get possible codes
            codeList := regexp_split_to_array(tempstring, '\|');

            foreach x in array codeList
            loop
               testCode = x || code;
                  for codeCompare in
                  select distinct s.code as codeCompare from subjects s
                  where s.code = testCode order by s.code
                  loop
                     rec := (gtype, codeCompare);
                        return next rec; 
                  end loop;
            end loop;
         -- else a normal addition with no needed regex
         -- No text alterations needed (usually). Again, untested
         else
            rec := (gtype, regex);
            return next rec; 
         end if;
      end loop;
   end if;
end;

$$ language plpgsql;

create or replace function
   Q9(gid integer) returns setof AcObjRecord
as $$
begin
   -- function to sort out results
   return query
   Select * 
   From Q9helper(gid)
   order by objcode;
   
end;

$$ language plpgsql;

-- Q10: follow-on courses

create or replace function
   Q10(code text) returns setof text
as $$
   -- declaration to store input $1
   declare input text := $1;

begin

   return query

   -- joins to get the appropriate course codes
   -- with a case onto subjects.code to make it appropriate for return
   select subjects.code::text from subjects
   join subject_prereqs on subject_prereqs.subject = subjects.id
   join rules on subject_prereqs.rule = rules.id
   join acad_object_groups on rules.ao_group = acad_object_groups.id
   -- filter for output. prereqs that have input in them
   where acad_object_groups.definition LIKE ('%' || input || '%')
   group by subjects.code;

end;

$$ language plpgsql;
