import { Router } from 'express';
import mysql from 'mysql';

const router = Router();

router.get('/categories', (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shopping-list',
  });

  connection.connect();

  connection.query('SELECT * FROM categories', function (error, results, fields) {
    if (error) console.log('ERROR', error);

    res.json(results);
  });

  connection.end();
});

export default router;
