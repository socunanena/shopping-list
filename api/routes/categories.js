import { Router } from 'express';
import db from '../db/connection';

const router = Router();

router.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (error, categories) => {
    if (error) {
      res.json([]);
    }

    res.json(categories);
  });
});

router.post('/categories', (req, res) => {
  const { id, name } = req.body;

  db.query('INSERT INTO categories (id, name) VALUES (?, ?)', [id, name], (error) => {
    if (error) {
      res.json(error);
    }
  });
});

router.delete('/categories/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM categories WHERE id = ?', [id], (error) => {
    if (error) {
      res.json(error);
    }
  });
});

export default router;
