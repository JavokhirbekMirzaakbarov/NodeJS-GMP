import { DataTypes } from 'sequelize';
import sequelize from '..';

const UserGroup = sequelize.define('usergroups', {
  userId: {
    allowNull: false,
    type: DataTypes.STRING,
    primaryKey: true,
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UserGroup;
