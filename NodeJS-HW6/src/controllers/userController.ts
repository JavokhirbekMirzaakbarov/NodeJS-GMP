import { Request, Response } from 'express';
import {
  getAutoSuggestUsers,
  createUser,
  deleteUserById,
  findUserById,
  getExistingUsers,
  updateUser,
} from '../services/userService';
import { AppError } from '../middleware/logger/app-error';
import { schema } from '../utils/user-validation';

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { loginSubstring, limit } = req.query;

  if (loginSubstring && limit) {
    const matchedUsers = await getAutoSuggestUsers(loginSubstring, limit);

    if (matchedUsers.length === 0)
      res.status(200).json({ message: 'There is no such user' });
    res.status(200).json(matchedUsers);
  }

  const data = await getExistingUsers();
  res.status(200).json(data);
};

export const getById = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  const user = await findUserById(id);

  if (!user) {
    const errorMessage = `User with id ${id} not found!`;
    res.status(400).json({ message: errorMessage });
    throw new AppError(400, errorMessage, 'GET USER', { id });
  }

  res.status(200).json(user);
};

export const addUser = async (req: Request, res: Response): Promise<any> => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ error });
  }

  const user = req.body;
  const newUser = await createUser(user);

  if (newUser) res.status(200).json({ newUser });
  else {
    const errorMessage = 'User not saved';
    res.status(200).json({ message: errorMessage });
    throw new AppError(400, errorMessage, 'POST', req.body);
  }
};

export const editUser = async (req: Request, res: Response): Promise<any> => {
  const validation = schema.validate(req.body);

  if (validation.error) {
    const message = JSON.stringify(validation.error.details[0].message);
    res.status(400).json({ message: `Validation failed! ${message}` });
  }

  const user = req.body;
  const id = req.params.id;
  const upUser = await updateUser(user, id);
  if (upUser) {
    res.status(200).json(user);
  } else {
    const errorMessage = 'User not updated';
    res.status(200).json({ message: errorMessage });
    throw new AppError(400, errorMessage, 'PUT', req.body);
  }
};

export const removeUser = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  const deleteduser = await deleteUserById(id);

  if (deleteduser[0] !== 0)
    res.status(200).json({ message: 'User has been deleted!' });
  else {
    const errorMessage = 'User had not been deleted!';
    res.status(200).json({ message: errorMessage });
    throw new AppError(400, errorMessage, 'DELETE', { id });
  }
};
