CREATE TABLE students ( id SERIAL PRIMARY KEY, fullName varchar(255) NOT NULL, email varchar(255) UNIQUE NOT NULL, age INT NOT NULL );

CREATE TABLE groups ( id SERIAL PRIMARY KEY, name varchar(255) NOT NULL, code varchar(255) UNIQUE NOT NULL );

CREATE TABLE groups_students( group_id int REFERENCES groups (id)
ON UPDATE CASCADE
ON
DELETE CASCADE, student_id int REFERENCES students (id)
ON UPDATE CASCADE
ON
DELETE CASCADE, CONSTRAINT group_student_pkey PRIMARY KEY (group_id, student_id) );