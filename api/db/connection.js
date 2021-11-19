import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'shopping_list',
});

connection.connect();

export default connection;
