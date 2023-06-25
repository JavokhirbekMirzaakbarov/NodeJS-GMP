import sequelize from '..';
import { Group as GroupAttributes } from '../../config/types';
import { DataTypes, ModelDefined, Optional } from 'sequelize';

type GroupCreationAttributes = Optional<GroupAttributes, 'id' | 'permissions'>;

const Group: ModelDefined<GroupAttributes, GroupCreationAttributes> =
  sequelize.define(
    'Group',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      tableName: 'groups',
    },
  );

export default Group;
