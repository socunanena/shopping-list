import { Router } from 'express';
import db from '../db/connection';

const router = Router();

router.get('/products', (req, res) => {
  db.query('SELECT p.id, p.name, c.name AS category, p.is_checked AS isChecked FROM products p LEFT JOIN categories c ON p.id_category = c.id', (error, products) => {
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

router.get('/products/list', (req, res) => {
  db.query('SELECT p.id, p.name, p.is_checked AS isChecked, c.name AS category, l.name AS list, l.id AS listId FROM products p LEFT JOIN categories c ON p.id_category = c.id INNER JOIN list_with_products lp ON p.id = lp.id_product INNER JOIN lists l ON lp.id_list = l.id', (error, products) => {
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

router.patch('/products/check/:id', (req, res) => {
  const { id } = req.params;
  const { isChecked } = req.body;

  db.query('UPDATE products SET is_checked = ? WHERE id = ?', [isChecked, id], (error) => {
    if (error) {
      res.json([]);
    }
  });
});

export default router;
