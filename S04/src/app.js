const log = console.log;
import express from 'express';
import dayjs from 'dayjs';
import database from './libs/database.js';
import PlanetsRoutes from './routes/planets.routes.js';
import methodMiddlewares from './middlewares/method.js';
import errorsMiddlewares from './middlewares/errors.js';
import elementsRoutes from './routes/elements.routes.js';

database();
const app = express();

app.use(express.json());
app.use(methodMiddlewares);
app.use('/planets', PlanetsRoutes);
app.use('/elements', elementsRoutes);
app.use(errorsMiddlewares);
export default app;