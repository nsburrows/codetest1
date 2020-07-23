drop schema if exists "masterdata" cascade;
create schema if not exists "masterdata";

CREATE TABLE if not exists masterdata.applicant (
	id int NOT NULL,
	"name" varchar(20) NOT NULL,
	age int NOT NULL,
	is_college_grad bool NOT NULL DEFAULT false
);

-- Ensure that API service doesn't break if csv is not loaded
insert into masterdata.applicant(id, name, age, is_college_grad) values (1,'Test',25,true);