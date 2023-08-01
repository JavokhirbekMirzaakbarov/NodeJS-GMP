import { Request, Response } from 'express';
import { addUsersToGroup, getAll } from '../services/userGroupService';
import { AppError } from '../middleware/logger/app-error';
import { schema } from '../utils/user-group-validation';

export const getAllGroupsWithUsers = async (
  _req: Request,
  res: Response,
): Promise<any> => {
  const data = await getAll();
  return res.status(200).json(data);
};

export const addUserToGroup = async (req: any, res: any): Promise<any> => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json(error.details);
  }
  const id = req.params.id;
  const userIds = req.body.userIds;
  const usersGroups = await addUsersToGroup(id, userIds);
  if (usersGroups) {
    res.status(200).json(usersGroups);
  } else {
    const errorMessage = `new bind not saved`;
    res.status(200).json({ message: errorMessage });
    throw new AppError(400, errorMessage, 'POST');
  }
};
