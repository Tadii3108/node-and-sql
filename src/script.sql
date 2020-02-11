DROP TABLE IF EXISTS visitors;

CREATE TABLE visitors (
    id serial primary key,
    visitor_name varchar(50),
    visitor_age int,
    date_of_visit varchar(10),
    time_of_visit varchar(5),
    assistant varchar(50),
    comments varchar(500)
);