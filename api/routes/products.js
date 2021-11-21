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

router.get('/products/list/:listId', (req, res) => {
  const listId = req.params.listId;
  db.query('SELECT p.id, p.name, c.name AS category FROM products p LEFT JOIN categories c ON p.id_category = c.id INNER JOIN list_with_products lp ON p.id = lp.id_product WHERE lp.id_list = ?', [listId], (error, products) => {
    if (error) {
      res.json([]);
    }

    res.json(products);
  });
});

router.post('/products/list', (req, res) => {
  const { productId, listId } = req.body;

  db.query('INSERT INTO list_with_products (id_list, id_product) VALUES (?, ?)', [listId, productId], (error) => {
    if (error) {
      res.json([]);
    }
  });
});

export default router;
