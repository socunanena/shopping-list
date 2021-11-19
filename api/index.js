import express from 'express';
import categories from './routes/categories';
import lists from './routes/lists';

const app = express();

app.use(express.json());
app.use(categories);
app.use(lists);

export default app;
