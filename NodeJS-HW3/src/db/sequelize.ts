import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'postgres://postgres:jack2000@localhost:5432/users',
);

export default sequelize;
