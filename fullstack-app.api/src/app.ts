import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
