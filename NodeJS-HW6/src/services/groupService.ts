import { v4 as uuidv4 } from 'uuid';
import Group from '../db/models/groupModel';
import { Group as GroupType } from '../config/types';

export const findGroupById = async (id: string) => {
  return await Group.findByPk(id);
};

export const getAll = async () => {
  return await Group.findAll();
};

export const createGroup = async (group: GroupType) => {
  const newGroup = {
    ...group,
    id: uuidv4(),
  };
  return await Group.create(newGroup);
};

export const updateGroup = async (newGroup: GroupType, id: string) => {
  return await Group.update(
    { ...newGroup },
    {
      where: {
        id: id,
      },
    },
  );
};

export const deleteGroupById = async (id: string) => {
  return await Group.destroy({ where: { id } });
};
