import sequelize from '..';
import users, { User as UserAttributes } from '../data';
import { DataTypes, ModelDefined, Optional } from 'sequelize';

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'age' | 'isDeleted'
>;

const User: ModelDefined<UserAttributes, UserCreationAttributes> =
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      tableName: 'users',
    },
  );

// populate db with some users
(async () => {
  await sequelize.sync({ force: true });
  users.map(async (user) => await User.create(user));
})();

export default User;
