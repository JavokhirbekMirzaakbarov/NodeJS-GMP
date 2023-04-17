import { Router, Response } from 'express';
import { User as UserType } from '../config/types';
import { userSchema, updateSchema } from '../config/schemas';
import { validateSchema } from '../utils/helpers';
import UserService from '../services/userService';

const router = Router();

const userService = new UserService();

router.param('id', async (_, res: Response, next: () => void, id) => {
  const user = await userService.findUserById(id);
  if (!user)
    res.status(404).json({ message: `User with id=${id} was not found!` });
  else {
    res.locals.user = user;
    next();
  }
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
  const result = await userService.createUser(req.body);
  res
    .status(201)
    .json({ message: 'New user created successfully!', data: result });
});

router.patch('/:id', validateSchema(updateSchema), async (req, res) => {
  await userService.updateUser(res.locals.user, req.body);
  res.status(201).json({ message: 'User updated successfully!' });
});

router.delete('/:id', async (req, res) => {
  await userService.deleteUserById(res.locals.user.id);
  res.status(200).json({ message: `User with id=${req.params.id} deleted!` });
});

export default router;
