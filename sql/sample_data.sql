set FOREIGN_KEY_CHECKS = 0;
truncate table users;
truncate table teams;
truncate table admin_team_relation;
truncate table tickets;
truncate table chatrooms;
truncate table chat_messages;
set FOREIGN_KEY_CHECKS = 1;

-- I don't think multi-row insert is standards compliant
insert into users (id, username, passwd, email, phone_no, long_name, user_type) values
(1, 'nikos', '$1$nikos$pUnMnI0A9iEoaypzPuJo6/', 'nikos@example.com', '555-867-5309', 'Nikos Chan', 1),
(2, 'kim', '$1$kim$9/yZtyREIsSKXoqwPVT3N1', 'kim@example.com', '555-123-0451', 'Koh Seu Kim', 1),
(3, 'zhubo', '$1$zhubo$2uNmk0b.b2rU//NKtB8jr/', 'zhubo@example.com', '62353535', 'Zhu Bo', 2),
(4, 'junwei', '$1$junwei$0C.0lsDIAGQiEC7v7XdnO/', 'junwei@example.com', '0118 999 881 999 119 7253', 'Chan Jun Wei', 2);

insert into teams (id, team_name) values 
(1, "Default Team"),
(2, "Accenture API");

insert into admin_team_relation (team_id, admin_id) values
(1, 3),
(1, 4);

insert into tickets (id, title, message, attachment_path, open_time, close_time, priority, severity, assigned_team, opener_user) values
(1, 'Cannot log in', 'Help! I can\'t log in using my token.', '', '2019-03-01 15:23:49', null, 1, 1, 1, 1),
(2, 'Speech analysis is broken', 'The transcriber doesn\'t understand my recording file', 'sample.mp3', '2019-03-02 09:13:20', null, 2, 2, 1, 2);

insert into chatrooms (id, description, ticket_id) values 
(1, 'Log in problem chat', 1);

insert into chat_messages (id, message, sent_time, sent_user_id, chatroom_id) values
(1, 'Hello, what seems to be the problem?', '2019-03-01 16:32:01', 3, 1),
(2, 'I generated a token using the admin panel but I can\'t authenticate using it!', '2019-03-01 19:00:52', 1, 1),
(3, 'Ok, we\'re working on it!', '2019-03-02 08:52:31', 4, 1);