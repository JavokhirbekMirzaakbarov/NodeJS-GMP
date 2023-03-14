import express from 'express';
import router from './routers/userRouter';
import users from './db/data';
import User from './models/userModel';
import sequelize from './db/sequelize';

const app = express();

app.use(express.json());

(async () => {
  await sequelize.sync({ force: true });
  users.map(async (user) => await User.create(user));
})();

app.use('/api/users', router);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
