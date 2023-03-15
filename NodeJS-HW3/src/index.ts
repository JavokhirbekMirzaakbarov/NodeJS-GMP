import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import router from './routers/userRouter';

const app = express();

app.use(express.json());

app.use('/api/users', router);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
