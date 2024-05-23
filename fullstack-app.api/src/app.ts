import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';
import { connection } from './config/db';

dotenv.config();

const app: Express = express();
const port = process.env.API_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (_req: Request, res: Response) => res.send('Hello, world!'));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
