import express from 'express';
import categories from './routes/categories';
import lists from './routes/lists';
import products from './routes/products';
import session from './routes/session';

const app = express();

app.use(express.json());
app.use(categories);
app.use(lists);
app.use(products);
app.use(session);

export default app;
