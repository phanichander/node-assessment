# Project developed for student and teacher management using Nodejs and MySQL

# setup with mysql DB:
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'schooldb'
});
 
once the DB connection successful, Create table for stundent, teacher and student_teacher.

# student
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| student_id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| student_email | varchar(100) | NO   | UNI | NULL    |                |
| status        | tinyint(4)   | YES  |     | 1       |                |
+---------------+--------------+------+-----+---------+----------------+

# teacher
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| teacher_id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| teacher_email | varchar(100) | NO   | UNI | NULL    |                |
| status        | tinyint(4)   | YES  |     | 1       |                |
+---------------+--------------+------+-----+---------+----------------+

# student_teacher;
+--------------------+---------+------+-----+---------+----------------+
| Field              | Type    | Null | Key | Default | Extra          |
+--------------------+---------+------+-----+---------+----------------+
| student_teacher_id | int(11) | NO   | PRI | NULL    | auto_increment |
| student_id         | int(11) | NO   | MUL | NULL    |                |
| teacher_id         | int(11) | NO   | MUL | NULL    |                |
+--------------------+---------+------+-----+---------+----------------+

# Steps to run this project:
 
1. **Install the dependencies** : `npm install`
2. **Start node app** : `npm start` and open [https://localhost:3000] in browser
3. **Run test** : `npm test`

# api/endpoints:

## GET Calls in browser:
1. (locahost)/api/commonstudents

## POST postman
1. (locahost)/api/register
2. (locahost)/api/suspend
3. (locahost)/api/retrievefornotifications

# UNIT TESTS
Unit test implement with Jest

npm test