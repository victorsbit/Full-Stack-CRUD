import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';

import { connection } from './config/db';
import { seedString } from './config/seed';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.NODE_PORT || 3001;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (_req: Request, res: Response) => {
  connection.query(seedString);
  return res.send('Hello, world!');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
