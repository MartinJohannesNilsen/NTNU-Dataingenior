create table Event
(
  event_id   int auto_increment not null,
  name varchar(45) not null,
  description text not null,
  date datetime not null,
  place varchar(40) not null,
  category_id int not null,
  img_url text,
  artists varchar(100) not null,
  tech_rider longtext not null,
  hospitality_rider longtext,
  contract longtext,
  personnel text,
  filed tinyint not null default 0,
  pending tinyint not null default 1,
  canceled tinyint not null default 0,
  constraint event_pk primary key (event_id)
);

create table Ticket_Category
(
  ticket_category_id int auto_increment not null,
  name varchar(45) not null,
  constraint ticket_category_pk primary key (ticket_category_id)
);

create table Event_Ticket
(
  event_id int not null,
  ticket_category_id int not null,
  price int not null,
  number int not null,
  constraint event_ticket_pk primary key (event_id, ticket_category_id)
);

create table Role
(
  role_id int auto_increment not null,
  role varchar(45) not null,
  constraint role_pk primary key (role_id)
);

-- should User have phone-numbers, since the information is 1-to-1

create table User
(
  user_id int auto_increment not null,
  name varchar(100) not null,
  email varchar(320) not null unique,
  phone varchar(12) not null unique,
  profile_photo longtext,
  password_hash varchar(128) not null,
  role_id int,
  approved tinyint not null default 0,
  constraint user_pk primary key (user_id)
)engine=InnoDB;

create table Category
(
  category_id int auto_increment not null,
  name varchar(45) not null,
  constraint category_pk primary key (category_id)
);

create table Comment
(
  comment_id int not null auto_increment,
  event_id int not null,
  user_id int not null,
  comment text not null,
  date datetime not null,
  constraint comment_pk primary key (comment_id)
);


create table Contact_Info
(
  contact_info_id int auto_increment not null,
  name varchar(100) not null,
  phone varchar(12) not null,
  email varchar(320) not null,
  event_id int not null,
  constraint contact_info_pk primary key (contact_info_id)
);


alter table Event
  add foreign key (category_id) references Category(category_id);

alter table Comment
  add foreign key (user_id) references User(user_id),
  add foreign key (event_id) references Event(event_id);

alter table Event_Ticket
  add foreign key (event_id) references Event(event_id),
  add foreign key (ticket_category_id) references Ticket_Category(ticket_category_id);

alter table User
  add foreign key (role_id) references Role(role_id);

alter table Contact_Info
  add foreign key (event_id) references Event(event_id);



insert into Role(role) values ('admin');
insert into Role(role) values ('Sceneansvarlig');
insert into Role(role) values ('Økonomisjef');
insert into Role(role) values ('Barsjef');
insert into Role(role) values ('Bartender');
insert into Role(role) values ('Handyman');
insert into Role(role) values ('Fotograf');
insert into Role(role) values ('Markedsfører');
insert into Role(role) values ('SoMe-ansvarlig');
insert into Role(role) values ('Ølbrygger');
insert into Role(role) values ('Lydteknikker');
insert into Role(role) values ('Lystekniker');
insert into Role(role) values ('Scenerigger');
insert into Role(role) values ('Artistbooker');
insert into Role(role) values ('Artistkontakt');
insert into Role(role) values ('Konseptutvikler');
insert into Role(role) values ('Quizmaster');
insert into Role(role) values ('Festplanlegger');


-- passwords 'testing'
insert into User(name, email, phone, profile_photo, password_hash, role_id) values ('test1', 'test1@tester.no', '12345678', 'test1.jpg', '3856f5086eb7138f2e4e3d42d8569ce4f4b66a83cbce3192da65ee129e8c01d2832057b4bd8f124a2a47d376de0c1808cabc2e467275cc9f7b8a059d618c04bd', 1);
insert into User(name, email, phone, profile_photo, password_hash, role_id) values ('test2', 'test2@tester.no', '87654321', 'test2.jpg', '75cf568134bd7a6a937592fb8f9aa5425a03e8d36edb2e894b187b4d0893d2e2eac917768a56a3fb16bdc7055d603e3be23ccb8e97c9cb5612d345218ec96279', 3);
insert into User(name, email, phone, profile_photo, password_hash, role_id) values ('test3', 'test3@tester.no', '98765432', 'test3.jpg', '75cf568134bd7a6a937592fb8f9aa5425a03e8d36edb2e894b187b4d0893d2e2eac917768a56a3fb16bdc7055d603e3be23ccb8e97c9cb5612d345218ec96279', 7);
insert into User(name, email, phone, profile_photo, password_hash, role_id) values ('test4', 'test4@tester.no', '10987654', 'test4.jpg', '75cf568134bd7a6a937592fb8f9aa5425a03e8d36edb2e894b187b4d0893d2e2eac917768a56a3fb16bdc7055d603e3be23ccb8e97c9cb5612d345218ec96279', 4);
insert into User(name, email, phone, profile_photo, password_hash, role_id) values ('test5', 'test5@tester.no', '10987644', 'test5.jpg', '75cf568134bd7a6a937592fb8f9aa5425a03e8d36edb2e894b187b4d0893d2e2eac917768a56a3fb16bdc7055d603e3be23ccb8e97c9cb5612d345218ec96279', 4);
insert into User(name, email, phone, profile_photo, password_hash, role_id) values ('test6', 'test6@tester.no', '67891011', 'test6.jpg', '75cf568134bd7a6a937592fb8f9aa5425a03e8d36edb2e894b187b4d0893d2e2eac917768a56a3fb16bdc7055d603e3be23ccb8e97c9cb5612d345218ec96279', 4);
insert into User(name, email, phone, profile_photo, password_hash, role_id) values ('test7', 'test7@tester.no', '78910112', 'test7.jpg', '75cf568134bd7a6a937592fb8f9aa5425a03e8d36edb2e894b187b4d0893d2e2eac917768a56a3fb16bdc7055d603e3be23ccb8e97c9cb5612d345218ec96279', 4);



insert into Category(name) values ('forelesning');
insert into Category(name) values ('konsert');
insert into Category(name) values ('kul');


insert into Ticket_Category(name) values ('Standard');
insert into Ticket_Category(name) values ('Gratis');
insert into Ticket_Category(name) values ('VIP');
insert into Ticket_Category(name) values ('GoldenCircle');
insert into Ticket_Category(name) values ('EarlyBird');


insert into Event(name, description, date, place, category_id, img_url, artists, tech_rider, hospitality_rider, personnel)
  values
      ('the Donn party', 'Donn holder repetisjonsforelesning i OS', '2020-02-03 20:30:00', 'Sukkerhuset', 1, 'picture of Donn', 'Donn Morrison', 'speakers 2x\n vocal solo mic 1x\n soundtrack with playback player 1x\n projector to show lectures\n all with linux', 'give him a beer or something to put an OS in, and compliment his lectures... just do it', 'an audience'),
          ('Metallica metal', 'Metallica kommer til Sukkerhuset!', '2020-01-09 14:30:00', 'Sukkerhuset', 2, 'picture of metallica', 'Metallica' , 'speakers 6x\n vocal solo mic 1x\n more speakers', 'lots of cool looking drinks and beer', 'has their own'),
              ('quiz-kveld', 'vi har quiz! kom med laget ditt eller finn nye folk å delta med her. Vi har bra premier!', '20-05-05 18:00:00', 'Sukkerhuset', 3, 'quiz-trophy', 'Sukkerhusets egne quizmaster', 'bunch of stuff', 'kopimaskin, ark, bord', 'quiz-master'),
                  ('event abc', 'abcdefghijklmnopqrstuvwxyzæøå', '2020-03-15 15:30:00', 'alfabetland',3, 'abc.picture', 'alfabetet', 'abc-sangen på repeat over lydanlegget', 'bilder av alfabetet som på barneskolen', 'people'), -- active event
                      ('enda en event', 'ja, enda en', '2021-05-20 17:30:00', 'Sukkerhuset', 1, 'flere.bilder', 'another one', 'more stuff', 'påfyll', 'personer'), -- filed event
                          ('et siste event', 'I know', '21-06-24 15:50:00', 'Sukkerhuset', 3, 'siste.jpg', 'siste akt', 'det som ligger bakerst', 'siste ølet', 'han som ble ansatt sist'); -- cancelled event

insert into Contact_Info( name, phone, email, event_id) values ('Donn team', '1991', 'Donn@linux.OS', 1);
insert into Contact_Info( name, phone, email, event_id) values ('Metallica', '2386724692', 'metallica@metal.band', 2);


insert into Event_Ticket(event_id, ticket_category_id, price, number) values (1, 4, 0, 95);
insert into Event_Ticket(event_id, ticket_category_id, price, number) values (2, 1, 1850, 200);
insert into Event_Ticket(event_id, ticket_category_id, price, number) values (2, 3, 1000, 2);


insert into Comment(event_id, user_id, comment, date) values (1,1,'this is a test comment', now());
insert into Comment(event_id, user_id, comment, date) values (1,2,'this is also a test comment', now());
insert into Comment(event_id, user_id, comment, date) values (5,2,'this is also a test comment', now());

update User set approved = 1, role_id = 1 where user_id = 2;
update User set approved = 1, role_id = 2 where user_id = 3;
update User set approved = 1 where user_id = 4;
update User set approved = 1 where user_id = 6;

update Event set pending = 0 where event_id = 4;
update Event set filed = 1 where event_id = 5;
update Event set canceled = 1 where event_id = 6;