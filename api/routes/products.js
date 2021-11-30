import { Router } from 'express';
import db from '../db/connection';

const router = Router();

router.get('/products/list', (req, res) => {
  db.query('SELECT p.id, p.name, p.is_checked AS isChecked, c.name AS category, l.name AS list, l.id AS listId FROM products p LEFT JOIN categories c ON p.id_category = c.id INNER JOIN list_with_products lp ON p.id = lp.id_product INNER JOIN lists l ON lp.id_list = l.id', (error, products) => {
    res.json(error ? [] : products);
  });
});

router.post('/products/list', (req, res) => {
  const { productId, listId } = req.body;

  db.query('INSERT INTO list_with_products (id_list, id_product) VALUES (?, ?)', [listId, productId], (error) => {
    res.status(error ? 500 : 201).end();
  });
});

router.delete('/products/list/:productId', (req, res) => {
  const { productId } = req.params;

  db.query('DELETE FROM list_with_products WHERE id_product = ?', [productId], (error) => {
    res.status(error ? 500 : 204).end();
  });
});

router.put('/products/list', (req, res) => {
  const { products } = req.body;
  const productIds = products.map(product => product.id);

  db.beginTransaction((error) => {
    if (error) {
      return res.status(500).end();
    }

    db.query('DELETE FROM list_with_products WHERE id_product IN (?)', [productIds], (error) => {
      if (error) {
        return db.rollback(() => res.status(500).end());
      }

      db.query('UPDATE products SET is_checked = ? WHERE id IN (?)', [false, productIds], (error) => {
        if (error) {
          return db.rollback(() => res.status(500).end());
        }

        db.commit((error) => {
          if (error) {
            return db.rollback(() => res.status(500).end());
          }
          console.log('successsss')

          return res.status(204).end();
        });
      });
    });
  });
});

router.get('/products', (req, res) => {
  db.query('SELECT p.id, p.name, c.name AS category, p.is_checked AS isChecked FROM products p LEFT JOIN categories c ON p.id_category = c.id', (error, products) => {
    res.json(error ? [] : products);
  });
});

router.post('/products', (req, res) => {
  const { id, name, categoryId } = req.body;

  db.query('INSERT INTO products (id, name, id_category) VALUES (?, ?, ?)', [id, name, categoryId], (error) => {
    res.status(error ? 500 : 201).end();
  });
});

router.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM products WHERE id = ?', [id], (error) => {
    res.status(error ? 500 : 204).end();
  });
});

router.patch('/products/check/:id', (req, res) => {
  const { id } = req.params;
  const { isChecked } = req.body;

  db.query('UPDATE products SET is_checked = ? WHERE id = ?', [isChecked, id], (error) => {
    res.status(error ? 500 : 204).end();
  });
});

export default router;
