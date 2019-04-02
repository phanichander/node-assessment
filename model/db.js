import mysql from 'mysql';

//mysql database connection
let connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'schooldb'
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;