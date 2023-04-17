import { v4 as uuidv4 } from 'uuid';
import Group from '../db/models/groupModel';
import { Group as GroupType } from '../config/types';
import UserGroup from '../db/models/userGroupModel';

export const findGroupById = async (id: string) => {
  return await Group.findByPk(id);
};

export const getAllGroups = async () => {
  return await Group.findAll();
};

export const createGroup = async ({ name, permissions }: GroupType) => {
  const newGroup = {
    name,
    id: uuidv4(),
    permissions,
  };
  return await Group.create(newGroup);
};

export const updateGroup = async (
  oldGroup: GroupType,
  newFields: Partial<GroupType>,
) => {
  const newGroup = {
    ...oldGroup,
    ...newFields,
  };
  return await Group.update(newGroup, {
    where: {
      id: oldGroup.id,
    },
  });
};

export const deleteGroupById = async (id: string) => {
  await UserGroup.destroy({ where: { groupId: id } });
  return await Group.destroy({ where: { id } });
};
