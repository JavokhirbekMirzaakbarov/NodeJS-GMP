import sequelize from '../db/sequelize';
import { User as UserAttributes } from '../db/data';
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

export default User;
