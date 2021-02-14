import express from 'express';
import categories from './routes/categories';

const app = express();

app.use(express.json());
app.use(categories);

export default app;
