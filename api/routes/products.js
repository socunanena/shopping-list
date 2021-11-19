import { Router } from 'express';
import db from '../db/connection';

const router = Router();

router.get('/products', (req, res) => {
  db.query('SELECT p.id, p.name, c.name AS category FROM products p LEFT JOIN categories c ON p.id_category = c.id', (error, products) => {
    if (error) {
      res.json([]);
    }

    res.json(products);
  });
});

router.post('/products', (req, res) => {
  const { id, name, categoryId } = req.body;

  db.query('INSERT INTO products (id, name, id_category) VALUES (?, ?, ?)', [id, name, categoryId], (error) => {
    if (error) {
      res.json(error);
    }
  });
});

router.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM products WHERE id = ?', [id], (error) => {
    if (error) {
      res.json(error);
    }
  });
});

export default router;
