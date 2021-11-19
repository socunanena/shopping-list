import express from 'express';
import categories from './routes/categories';
import lists from './routes/lists';
import products from './routes/products';

const app = express();

app.use(express.json());
app.use(categories);
app.use(lists);
app.use(products);

export default app;
