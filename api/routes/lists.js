import { Router } from 'express';
import db from '../db/connection';

const router = Router();

router.get('/lists', (req, res) => {
  db.query('SELECT * FROM lists', (error, lists) => {
    if (error) {
      res.json([]);
    }

    res.json(lists);
  });
});

router.post('/lists', (req, res) => {
  const { id, name } = req.body;

  db.query('INSERT INTO lists (id, name) VALUES (?, ?)', [id, name], (error) => {
    if (error) {
      res.json(error);
    }
  });
});

router.delete('/lists/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM lists WHERE id = ?', [id], (error) => {
    if (error) {
      res.json(error);
    }
  });
});

export default router;
