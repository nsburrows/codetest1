drop schema if exists "masterdata" cascade;
create schema if not exists "masterdata";

CREATE TABLE if not exists masterdata.applicant (
	id SERIAL PRIMARY KEY,
	"name" varchar(20) NOT NULL,
	age int NOT NULL,
	is_college_grad bool NOT NULL DEFAULT false
);

-- Ensure that API service doesn't break if csv is not loaded
insert into masterdata.applicant(name, age, is_college_grad) values ('Test',25,true);

-- Ensure the new ideas don't overlap with data from the csv
alter sequence masterdata.applicant_id_seq restart 1000;