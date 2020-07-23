drop schema if exists "masterdata" cascade;
create schema if not exists "masterdata";

CREATE TABLE if not exists masterdata.applicant (
	id int NOT NULL,
	"name" varchar(20) NOT NULL,
	age int NOT NULL,
	is_college_grad bool NOT NULL DEFAULT false
);

insert into masterdata.applicant(id, name, age, is_college_grad) values (1,'Nigel',25,true);
insert into masterdata.applicant values (2,'Stefano',26,false);
insert into masterdata.applicant values (3,'Charvonya',38,true);

select * from masterdata.applicant where id = 2;

select * from masterdata.applicant order by age desc