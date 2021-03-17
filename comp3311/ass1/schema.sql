-- COMP3311 20T3 Assignment 1
-- Calendar schema
-- Written by John Dao z5258962

-- Types

create type AccessibilityType as enum ('read-write','read-only','none');
create type InviteStatus as enum ('invited','accepted','declined');
create type AdminStatus as enum ('admin', 'user');
create type VisibilityType as enum ('public', 'private');
create type DayOfWeek as enum ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
-- add more types/domains if you want

/*

		ALL TABLES

*/

-- Users table
create table Users (
	id          		serial,
	name				text not null,
	email       		text not null unique, -- email must not be taken
	passwd				text not null,
	is_admin 			boolean not null default false,

	primary key (id)
);

-- Groups table
create table Groups (
	id          		serial,
	name        		text not null,
	owner				serial not null,

	primary key (id),
	foreign key (owner) references Users (id)
);

-- Members relation table
create table Members (
	user_id 			serial,
	group_id			serial,

	primary key (user_id, group_id),
	foreign key (user_id) references Users (id),
	foreign key (group_id) references Groups (id)
);

-- Calendar Table. 
create table Calendars (
	id					serial,
	owner 				serial,
	colour				text not null,
	name				text not null,
	default_access 		AccessibilityType not null default 'read-write',
	
	primary key (id),
	foreign key (owner) references Users (id)
);

-- Accessibility between user and Calendar table
create table Accessibility (
	calendar_id 		serial,
	user_id				serial,
	access				AccessibilityType not null default 'none',

	primary key (calendar_id, user_id),
	foreign key (calendar_id) references Calendars (id),
	foreign key (user_id) references Users (id)
);

-- Subscribed between user and calendar table
create table Subscriptions (
	calendar_id			serial,
	user_id				serial,
	colour 				text, 

	primary key (calendar_id, user_id),
	foreign key (calendar_id) references Calendars (id),
	foreign key (user_id) references Users (id)
);

/*
 
		All event tables below

*/

-- Main Event table
create table Events (
	id					serial,
	title				text not null,

	-- Based on the fact that google calendars are all private by default
	visibility			VisibilityType not null default 'private', 
	location			text,
	start_time			time,
	end_time			time,

	-- calendar part of 
	calendar_id			serial,
	-- created by
	created_by			serial,
	primary key (id),
	foreign key (calendar_id) references Calendars (id),
	foreign key (created_by) references Users (id)
);

-- invitation
create table Invites (
	event_id			serial,
	user_id				serial,

	-- assumes default action of invitation
	status				InviteStatus not null default 'invited',

	foreign key (event_id) references Events (id),
	foreign key (user_id) references Users (id)
);

-- Alarms
create table Alarms (
	event_id			serial,
	alarm				timestamp not null, 
	primary key (event_id, alarm),
	foreign key (event_id) references Events (id)
);

-- One Day Events table
create table One_Day_Events (
	id					serial,
	date				date not null,

	primary key (id),
	foreign key (id) references Events (id)
);

-- Spanning Event Table
create table Spanning_Events (
	id					serial,
	start_date			date not null,
	end_date			date not null,

	-- ensure that the end date is always after start date
	CONSTRAINT date_end_check CHECK (end_date > start_date),

	primary key (id),
	foreign key (id) references Events (id)
);

/*
 
		All recurring events including their subtables

*/

-- recurring events
create table Recurring_Events (
	id					serial,
	start_date			date not null,
	end_date			date default null,
	ntimes 				int,

	-- ensure that the end date is always start date
	CONSTRAINT date_end_check CHECK (end_date > start_date),

	primary key (id),
	foreign key (id) references Events (id)
);

-- weekly events
create table Weekly_Events (
	id					serial,
	day_of_week			DayOfWeek not null,
	frequency			int	not null,

	primary key (id),
	foreign key (id) references Recurring_Events (id)
);

--- monthly by day events
create table Monthly_By_Day_Events (
	id					serial,
	day_of_week			DayOfWeek not null,
	week_in_month		int not null,
	-- check if week in month is between 1 and 5 as determined by ER diagram
	CONSTRAINT week_in_month_check CHECK (week_in_month BETWEEN 1 AND 5),

	primary key (id),
	foreign key (id) references Recurring_Events (id)
);

-- monthly by date events
create table Monthly_By_Date_Events (
	id 					serial,
	date_in_month		int not null,
	CONSTRAINT date_in_month_check CHECK (date_in_month BETWEEN 1 AND 31),

	primary key (id),
	foreign key (id) references Recurring_Events (id)
);

-- annual event table
create table Annual_Events (
	id 					serial,
	date				date not null,				

	primary key (id),
	foreign key (id) references Recurring_Events (id)
);

