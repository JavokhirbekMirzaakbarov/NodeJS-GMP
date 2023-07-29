import { Request, Response } from 'express';
import { AppError } from '../middleware/logger/app-error';
import {
  findGroupById,
  getAll,
  createGroup,
  updateGroup,
  deleteGroupById,
} from '../services/groupService';
import { schema } from '../utils/group-validation';

export const getAllGroups = async (
  _req: Request,
  res: Response,
): Promise<any> => {
  const data = await getAll();
  return res.status(200).json(data);
};

export const getGroupById = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const id = req.params.id;
  const group = await findGroupById(id);

  if (!group) {
    const errorMessage = `Group with id ${id} not found`;
    res.status(400).json(errorMessage);
    throw new AppError(400, errorMessage, 'GET', { id });
  }

  res.status(200).json(group);
};

export const addGroup = async (req: Request, res: Response): Promise<any> => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  const group = req.body;
  const newGroup = await createGroup(group);
  if (newGroup) {
    res.status(200).json(newGroup);
  } else {
    const errorMessage = `Group not saved`;
    res.status(200).json({ message: errorMessage });
    throw new AppError(400, errorMessage, 'POST', req.body);
  }
};

export const editGroup = async (req: Request, res: Response): Promise<any> => {
  const validation = schema.validate(req.body);
  if (validation.error) {
    const message = JSON.stringify(validation.error.details[0].message);
    res.status(400).json({ message: `Validation failed ${message}` });
  }
  const group = req.body;
  const id = req.params.id;
  const upGroup = await updateGroup(group, id);

  if (upGroup) {
    res.status(200).json(group);
  } else {
    const errorMessage = 'User not updated';
    res.status(200).json({ message: errorMessage });
    throw new AppError(400, errorMessage, 'PUT', { id });
  }
};

export const removeGroup = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const id = req.params.id;
  const deletedGroup = await deleteGroupById(id);

  if (deletedGroup) {
    res.status(200).json({ message: `Group had been deleted` });
  } else {
    res.status(200).json({ message: 'Something went wrong' });
    throw new AppError(400, 'group had NOT been deleted', 'DELETE', { id });
  }
};
