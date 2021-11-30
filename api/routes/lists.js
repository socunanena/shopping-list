import { Router } from 'express';
import db from '../db/connection';

const router = Router();

router.get('/lists', (req, res) => {
  db.query('SELECT * FROM lists', (error, lists) => {
    res.json(error ? [] : lists);
  });
});

router.post('/lists', (req, res) => {
  const { id, name } = req.body;

  db.query('INSERT INTO lists (id, name) VALUES (?, ?)', [id, name], (error) => {
    res.status(error ? 500 : 201).end();
  });
});

router.delete('/lists/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM lists WHERE id = ?', [id], (error) => {
    res.status(error ? 500 : 204).end();
  });
});

export default router;
