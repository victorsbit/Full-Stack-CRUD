import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.NODE_PORT || 3000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (_req: Request, res: Response) => res.send('Hello, world!!!'));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
