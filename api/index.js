import express from 'express';
import categories from './routes/categories';

const app = express();

app.use(categories);

export default app;
