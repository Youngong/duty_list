-- create table
CREATE TABLE if not exists myduty
(
  id BIGSERIAL primary key,
  user_id bigint NOT NULL DEFAULT 0,
  title varchar(100) NOT NULL DEFAULT '',
  created_by character varying(100) DEFAULT '',
  updated_by character varying(100) DEFAULT '',
  created_date timestamp without time zone DEFAULT now(),
  updated_date timestamp without time zone DEFAULT now()
)with (oids = false);