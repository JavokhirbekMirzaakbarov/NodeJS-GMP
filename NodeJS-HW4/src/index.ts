import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routers/userRouter';
import groupRouter from './routers/groupRouter';
import userGroupRouter from './routers/userGroupRouter';

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);
app.use('/api/user-groups', userGroupRouter);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
