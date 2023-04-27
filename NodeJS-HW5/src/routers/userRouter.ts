import { Router, Response } from 'express';
import { User as UserType } from '../config/types';
import { userSchema, updateSchema } from '../config/schemas';
import { validateSchema } from '../utils/helpers';
import UserService from '../services/userService';
import { AppErrors } from '../logger/app-errors';

const router = Router();

const userService = new UserService();

router.param('id', async (_, res: Response, next: () => void, id) => {
  const user = await userService.findUserById(id);
  if (!user) {
    const errorMessage = `User with id ${id} not found!`;
    res.status(400).json({ message: errorMessage });
    throw new AppErrors(400, errorMessage, 'GET');
  }
  res.locals.user = user;
  next();
});

router.get('/', async (req, res) => {
  const { loginSubstring, limit } = req.query;
  const users = await userService.getExistingUsers();

  if (loginSubstring && limit) {
    const filteredUsers = await userService.filterUsers(
      users as unknown as UserType[],
      loginSubstring as string,
      +limit,
    );
    res.status(200).json(filteredUsers);
  } else {
    res.status(200).json(users);
  }
});

router.get('/:id', (_, res) => {
  res.status(200).json(res.locals.user);
});

router.post('/', validateSchema(userSchema), async (req, res) => {
  const newUser = await userService.createUser(req.body);
  if (newUser)
    res
      .status(201)
      .json({ message: 'New user created successfully!', data: newUser });
  else {
    const errorMessage = `User did not get saved!`;
    res.status(200).json({ message: errorMessage });
    throw new AppErrors(400, errorMessage, 'POST');
  }
});

router.patch('/:id', validateSchema(updateSchema), async (req, res) => {
  const updatedUser = await userService.updateUser(res.locals.user, req.body);
  if (updatedUser)
    res.status(201).json({ message: 'User updated successfully!' });
  else {
    const errorMessage = 'User did not get not updated!';
    res.status(200).json({ message: errorMessage });
    throw new AppErrors(400, errorMessage, 'PATCh');
  }
});

router.delete('/:id', async (req, res) => {
  const deletedUser = await userService.deleteUserById(res.locals.user.id);
  if (deletedUser)
    res.status(200).json({ message: `User with id=${req.params.id} deleted!` });
  else {
    const errorMessage = 'User had NOT been deleted!';
    res.status(200).json({ message: errorMessage });
    throw new AppErrors(400, errorMessage, 'DELETE');
  }
});

export default router;
