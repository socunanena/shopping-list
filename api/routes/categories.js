import { Router } from 'express';

// To be emoved when implemented the real DB
const categories = [
  {
    id: 0,
    name: 'Carnisseria',
  },
  {
    id: 1,
    name: 'Fruiteria',
  },
  {
    id: 2,
    name: 'Peixateria',
  },
  {
    id: 3,
    name: 'Xarcuteria',
  },
];

const router = Router();

router.get('/categories', (req, res) => {
  res.json(categories);
});

export default router;
