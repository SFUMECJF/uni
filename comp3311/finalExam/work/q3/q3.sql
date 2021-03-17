-- COMP3311 20T3 Final Exam
-- Q3:  performer(s) who play many instruments

-- ... helper views (if any) go here ...
create or replace view q3Instruments(instruments)
as
    select distinct (select distinct case 
            when instrument like 'lead guitar' then 'guitar'
            when instrument like 'rythm guitar' then 'guitar'
            when instrument like 'acoustic guitar' then 'guitar'
            when instrument like 'guitars' then 'guitar'
            when instrument not like 'lead guitar' then instrument
            when instrument not like 'rythm guitar' then instrument
            when instrument not like 'acoustic guitar' then instrument
            when instrument not like 'guitars' then instrument
            end) as instrument from playsOn
    where instrument not like 'vocals'
;



create or replace view q3(performer,ninstruments)
as
    select performers.name, count(b.instrument)
    from performers
    join (select distinct case 
            when instrument like 'lead guitar' then 'guitar'
            when instrument like 'rythm guitar' then 'guitar'
            when instrument like 'acoustic guitar' then 'guitar'
            when instrument like 'guitars' then 'guitar'
            when instrument not like 'lead guitar' then instrument
            when instrument not like 'rythm guitar' then instrument
            when instrument not like 'acoustic guitar' then instrument
            when instrument not like 'guitars' then instrument
            end
            as instrument, performer from playsOn where instrument not like 'vocals') as b on performers.id = b.performer
    group by performers.id
    having count(b.instrument) > (select count(instruments) from q3Instruments)/2
    order by count(b.instrument) desc
    
;

