-- COMP3311 20T3 Assignment 1
-- Calendar schema
-- Written by Minh Pham

-- Types

create type AccessibilityType as enum ('read-write','read-only','none');
create type InviteStatus as enum ('invited','accepted','declined');
create type VisibilityType as enum ('public','private');
create type DaysOfTheWeek as enum ('sun','mon','tue','wed','thu','fri','sat');

-- Tables

-- ER diagram #1

-- entity
create table Users (
	id          serial,
	email       text not null unique
		check (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'), 
	name		text not null
		check (name !~* '[~!@#$%^&*()+=\[\]{}|\\:;",<>/?]+'), -- a name should not have symbols
	passwd		text not null
		check (passwd !~* '[ ]+'), -- password should not have spaces
	is_admin	bool not null, 
	primary key (id)
);

-- entity
create table Groups (
	id          serial,
	name        text not null,
	owner		integer not null,
	primary key (id),
	foreign key (owner) references Users(id)
);

-- relation between Users and Groups
create table Member (
	user_id		integer not null,
	group_id	integer not null,
	primary key	(user_id, group_id),
	foreign key	(user_id) references Users(id),
	foreign key	(group_id) references Groups(id)
);

-- ER diagram #2

-- entity
create table Calendars (
	id			serial,
	name		text not null,
	colour		text not null,
	default_access	AccessibilityType not null
		check (default_access in ('read-write','read-only','none')),
	owner		integer not null,
	primary key	(id),
	foreign key	(owner) references Users(id)
);

-- relation between Users and Calendars
create table Accessibility (
	user_id		integer not null,
	calendar_id	integer not null,
	access 		AccessibilityType not null
		check (access in ('read-write','read-only','none')),
	primary key (user_id, calendar_id),
	foreign key	(user_id) references Users(id),
	foreign key	(calendar_id) references Calendars(id)
);

-- relation between Users and Calendars
create table Subscribed (
	user_id		integer not null,
	calendar_id	integer not null,
	colour 		text,	-- can be null when subscriber didn't choose a colour
	primary key (user_id, calendar_id),
	foreign key	(user_id) references Users(id),
	foreign key	(calendar_id) references Calendars(id)
);

-- ER diagram #3

-- entity
create table Events (
	id			serial unique,
	title		text not null,
	start_time	time check (start_time < end_time),
	end_time	time check (end_time > start_time),
	visibility	VisibilityType not null
		check (visibility in ('public','private')),
	location	point, -- (x, y)
	part_of		integer not null,
	created_by	integer not null,
	primary key	(id),
	foreign key (part_of) references Calendars(id),
	foreign key (created_by) references Users(id)
);

-- multi-value entity linking Events table
create table Alarms (
	event_id	integer not null,
	alarms 		integer not null check (alarms > 0), -- alarm must be 1 minute or longer
	primary key	(event_id, alarms),
	foreign key (event_id) references Events(id)
);

-- subclass entity of Events
create table One_Day_Event (
	event_id	integer not null,
	date 		date not null,
	primary key (event_id),
	foreign key (event_id) references Events(id)
);

-- subclass entity of Events
create table Spanning_Event (
	event_id	integer not null,
	start_date 	date not null check (start_date < end_date),
	end_date 	date not null check (end_date > start_date),
	primary key (event_id),
	foreign key (event_id) references Events(id)
);

-- ER diagram #4

-- subclass entity of Events
create table Recurring_Event (
	event_id	integer not null,
	start_date 	date not null,
	end_date 	date,	-- NULL = ongoing
	ntimes		integer check (ntimes > 0),	
	primary key (event_id),
	foreign key (event_id) references Events(id)
);

-- subclass entity of Recurring_Event
create table Weekly_Event (
	recurring_event_id	integer not null,
	dayOfWeek	DaysOfTheWeek not null 
		check (dayOfWeek in ('sun','mon','tue','wed','thu','fri','sat')),	
			-- mon...sun
	frequency	integer not null check (frequency >= 1),	-- every N weeks 1, 2, 3, ...
	primary key	(recurring_event_id),
	foreign key	(recurring_event_id) references Recurring_Event(event_id)
);

-- subclass entity of Recurring_Event
create table Monthly_By_Day_Event (
	recurring_event_id	integer not null,
	dayOfWeek	DaysOfTheWeek not null 
		check (dayOfWeek in ('sun','mon','tue','wed','thu','fri','sat')),	
			-- mon...sun
	weekInMonth	integer not null
		check (weekInMonth >= 1 and weekInMonth <= 5),	-- 1...5
	primary key	(recurring_event_id),
	foreign key	(recurring_event_id) references Recurring_Event(event_id)
);

-- subclass entity of Recurring_Event
create table Monthly_By_Date_Event (
	recurring_event_id	integer not null,
	dateInMonth	integer not null
		check (dateInMonth >= 1 and dateInMonth <= 31),	-- 1...31
	primary key	(recurring_event_id),
	foreign key	(recurring_event_id) references Recurring_Event(event_id)
);

-- subclass entity of Recurring_Event
create table Annual_Event (
	recurring_event_id	integer not null,
	date	date not null,	-- e.g. Feb 02
	primary key	(recurring_event_id),
	foreign key	(recurring_event_id) references Recurring_Event(event_id)
);

-- relation between Events and Users
create table Invited (
	user_id		integer not null,
	event_id	integer not null,
	status 		InviteStatus not null
		check (status in ('invited','accepted','declined')),
	primary key (user_id, event_id),
	foreign key	(user_id) references Users(id),
	foreign key	(event_id) references Events(id)
);
