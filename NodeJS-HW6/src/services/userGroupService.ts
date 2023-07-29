import sequelize from '../../src/db';
import UserGroup from '../db/models/userGroupModel';

export const getAll = async () => {
  return await UserGroup.findAll();
};

export const addUsersToGroup = async (groupId: string, userIds: string[]) => {
  const transaction = await sequelize.transaction();
  try {
    const records = userIds.map((userId) => ({ groupId, userId }));
    const result = await UserGroup.bulkCreate(records, { transaction });
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw new Error();
  }
};
