import sequelize from '..';
import { User as UserAttributes } from '../../config/types';
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
        type: DataTypes.UUID,
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
