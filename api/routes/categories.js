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

export default router;
