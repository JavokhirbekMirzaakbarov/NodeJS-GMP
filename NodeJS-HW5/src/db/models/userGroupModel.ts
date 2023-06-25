import sequelize from '..';
import Group from './groupModel';
import User from './userModel';

const UserGroup = sequelize.define('UserGroup', {});

User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId' });
Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId' });

export default UserGroup;
