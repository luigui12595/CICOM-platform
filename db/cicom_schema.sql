CREATE DATABASE IF NOT EXISTS cicom
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;

CREATE  TABLE IF NOT EXISTS cicom.user(
  user_id         integer auto_increment,
  fname           varchar(50),
  lname           varchar(50),
  email           varchar(50) NOT NULL UNIQUE,
  password        varchar(100),
  modif_date      timestamp,
  creation_date   timestamp,
  active          tinyint(1) NOT NULL,
  is_admin        tinyint(1) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS cicom.action(
  action_id integer,
  action varchar(30),
  PRIMARY KEY (action_id)
);

CREATE TABLE IF NOT EXISTS cicom.session_control
(
  user_id integer,
  session_start timestamp,
  session_token varchar(250) UNIQUE,
  session_finish timestamp,
  PRIMARY KEY (user_id, session_token),
  FOREIGN KEY (user_id) REFERENCES cicom.user(user_id)
);

CREATE TABLE IF NOT EXISTS cicom.log
(
  log_id bigint auto_increment,
  user_id integer,
  element_id bigint,
  session_token varchar(250),
  action_id integer,
  timemark timestamp,
  PRIMARY KEY (log_id, user_id),
  FOREIGN KEY (action_id) REFERENCES cicom.action(action_id),
  FOREIGN KEY (user_id) REFERENCES cicom.user(user_id),
  FOREIGN KEY (session_token) REFERENCES cicom.session_control(session_token)
);

CREATE TABLE IF NOT EXISTS cicom.subject
(
  subject_id integer auto_increment,
  name varchar(100),
  PRIMARY KEY (subject_id)
);

CREATE TABLE IF NOT EXISTS cicom.media
(
  media_id integer auto_increment,
  name varchar(100),
  facebook_name varchar(100),
  facebook_id varchar(100),
  PRIMARY KEY (media_id)
);

CREATE TABLE IF NOT EXISTS cicom.section
(
  section_id integer auto_increment,
  media_id integer,
  name varchar(100),
  PRIMARY KEY (section_id, media_id),
  FOREIGN KEY (media_id) REFERENCES cicom.media(media_id)
);

CREATE TABLE IF NOT EXISTS cicom.candidate
(
  candidate_id integer auto_increment,
  name varchar(100),
  PRIMARY KEY (candidate_id)
);
