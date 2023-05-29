DROP table [user]
DROP table user_skill
drop table timesheet
drop table story_invite
drop table story_media
drop table story
drop table mission_rating
drop table mission_invite
drop table mission_application
drop table favourite_mission
drop table comment


CREATE TABLE [dbo].[user](
	[user_id] [bigint] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](16) NULL,
	[last_name] [varchar](16) NULL,
	[email] [varchar](128) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[phone_number] [varchar](15) NOT NULL constraint CK_MyTable_PhoneNumber check ([phone_number] not like '%[^0-9]%'),
	[avatar] [varchar](2048) NULL,
	[why_i_volunteer] [text] NULL,
	[employee_id] [varchar](16) NULL,
	[department] [varchar](16) NULL,
	[city_id] [bigint] NOT NULL,
	[country_id] [bigint] NOT NULL,
	[profile_text] [text] NULL,
	[linked_in_url] [varchar](255) NULL,
	[title] [varchar](255) NULL,
	[status] [bit] NOT NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_city_id]  DEFAULT ((1)) FOR [city_id]
GO

ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_country_id]  DEFAULT ((2)) FOR [country_id]
GO

ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_status]  DEFAULT ((1)) FOR [status]
GO

ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_created_at]  DEFAULT (getdate()) FOR [created_at]
GO

ALTER TABLE [dbo].[user]  WITH CHECK ADD  CONSTRAINT [FK_user_city] FOREIGN KEY([city_id])
REFERENCES [dbo].[city] ([city_id])
GO

ALTER TABLE [dbo].[user] CHECK CONSTRAINT [FK_user_city]
GO

ALTER TABLE [dbo].[user]  WITH CHECK ADD  CONSTRAINT [FK_user_country] FOREIGN KEY([country_id])
REFERENCES [dbo].[country] ([country_id])
GO

ALTER TABLE [dbo].[user] CHECK CONSTRAINT [FK_user_country]
GO



create table user_skill(
user_skill_id	bigint not null primary key identity,
user_id	bigint not null,
skill_id bigint not null,
create_at datetime not null default CURRENT_TIMESTAMP,
updated_at datetime default null,
deleted_at datetime default null,
FOREIGN KEY (user_id) REFERENCES [user](user_id),
FOREIGN KEY (skill_id) REFERENCES skill(skill_id),

);

create table timesheet(
timesheet_id	bigint not null identity primary key,
user_id	bigint,
mission_id	bigint,
time	time,
action	int,
date_volunteered	datetime not null,
notes	text,
status varchar(20) not null check(status in ('APPROVED' , 'PENDING')) default 'PENDING',
create_at datetime not null default CURRENT_TIMESTAMP,
updated_at datetime default null,
deleted_at datetime default null,
FOREIGN KEY (user_id) REFERENCES [user](user_id),
FOREIGN KEY (mission_id) REFERENCES mission(mission_id),
);


create table story (
story_id	bigint not null primary key identity,
user_id	bigint not null,
mission_id	bigint not null,
title	varchar(255),
description	text,
status varchar(20) not null check(status in ('DECLINED' , 'DRAFT')) default 'DRAFT',
published_at datetime default null,
create_at datetime not null default CURRENT_TIMESTAMP,
updated_at datetime default null,
deleted_at datetime default null,
FOREIGN KEY (user_id) REFERENCES [user](user_id),
FOREIGN KEY (mission_id) REFERENCES mission(mission_id),
);

create table story_invite(
story_invite_id 	bigint not null identity primary key,
story_id	bigint not null,
from_user_id	bigint not null,
to_user_id 	bigint not null,
create_at datetime not null default CURRENT_TIMESTAMP,
updated_at datetime default null,
deleted_at datetime default null,
FOREIGN KEY (story_id) REFERENCES story(story_id),

);

create table story_media(
story_media_id	bigint not null primary key identity,
story_id bigint not null,
type	varchar(8) not null,
path	text not null,
create_at datetime not null default CURRENT_TIMESTAMP,
updated_at datetime default null,
deleted_at datetime default null,
FOREIGN KEY (story_id) REFERENCES story(story_id),
);

create table mission_rating(
mission_rating_id	bigint not null identity primary key,
user_id	bigint not null,
mission_id	bigint not null,
rating	int not null check(rating in (1,2,3,4,5)),
create_at datetime not null default CURRENT_TIMESTAMP,
updated_at datetime default null,
deleted_at datetime default null,
FOREIGN KEY (user_id) REFERENCES [user](user_id),
FOREIGN KEY (mission_id) REFERENCES mission(mission_id),

);

create table mission_invite (
mission_invite_id	bigint not null identity primary key,
mission_id	bigint not null,
from_user_id	bigint not null,
to_user_id	bigint not null,
create_at datetime not null default CURRENT_TIMESTAMP,
updated_at datetime default null,
deleted_at datetime default null,
FOREIGN KEY (from_user_id) REFERENCES [user](user_id),
FOREIGN KEY (to_user_id) REFERENCES [user](user_id),
FOREIGN KEY (mission_id) REFERENCES mission(mission_id),

);


create table mission_application (
mission_application_id	bigint not null identity primary key,
mission_id	bigint not null,
user_id	bigint not null,
applied_at	datetime not null,
approval_status varchar(20) not null check(approval_status in ('APPROVED' , 'PENDING' , 'DECLINE')) default 'PENDING',
create_at datetime not null default CURRENT_TIMESTAMP,
updated_at datetime default null,
deleted_at datetime default null,
FOREIGN KEY (user_id) REFERENCES [user](user_id),
FOREIGN KEY (mission_id) REFERENCES mission(mission_id),
);

create table favorite_mission(
favourite_mission_id	bigint not null identity primary key,
user_id	bigint not null,
mission_id	bigint not null,
create_at datetime not null default CURRENT_TIMESTAMP,
updated_at datetime default null,
deleted_at datetime default null,
FOREIGN KEY (user_id) REFERENCES [user](user_id),
FOREIGN KEY (mission_id) REFERENCES mission(mission_id),

);

create table comment (
comment_id	bigint not null identity primary key,
user_id	bigint not null,
mission_id	bigint not null,
approval_status varchar(20) not null check(approval_status in ('PUBLISHED' , 'PENDING' , 'DECLINE')) default 'PENDING',
create_at datetime not null default CURRENT_TIMESTAMP,
updated_at datetime default null,
deleted_at datetime default null,
FOREIGN KEY (user_id) REFERENCES [user](user_id),
FOREIGN KEY (mission_id) REFERENCES mission(mission_id),
);
