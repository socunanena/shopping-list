import { Router } from 'express';
import db from '../db/connection';

const router = Router();

router.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (error, categories) => {
    res.json(error ? [] : categories);
  });
});

router.post('/categories', (req, res) => {
  const { id, name } = req.body;

  db.query('INSERT INTO categories (id, name) VALUES (?, ?)', [id, name], (error) => {
    res.status(error ? 500 : 201).end();
  });
});

router.delete('/categories/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM categories WHERE id = ?', [id], (error) => {
    res.status(error ? 500 : 204).end();
  });
});

export default router;
