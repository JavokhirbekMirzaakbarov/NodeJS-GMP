import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/userModel';
import { userSchema, updateSchema } from '../config/schemas';
import { validateSchema } from '../services/helpers';

const router = Router();

router.param('id', async (_, res: Response, next: () => void, id) => {
  const user = await User.findByPk(id);
  if (!user)
    res.status(404).json({ message: `User with id=${id} was not found!` });
  else {
    res.locals.user = user;
    next();
  }
});

router.get('/', async (req, res) => {
  const exUsers = await User.findAll({
    where: { isDeleted: false },
  });
  const { limit, loginSubstring } = req.query;

  if (limit && loginSubstring) {
    res
      .status(200)
      .json(
        exUsers
          .filter((user) =>
            user.getDataValue('login').includes(`${loginSubstring}`),
          )
          .slice(0, +limit),
      );
  } else {
    res.status(200).json(exUsers);
  }
});

router.get('/:id', (_, res) => {
  res.status(200).json(res.locals.user);
});

router.post('/', validateSchema(userSchema), async (req, res) => {
  const newUser = {
    ...req.body,
    id: uuidv4(),
    isDeleted: false,
  };
  await User.create(newUser);
  res
    .status(201)
    .json({ message: 'New user created successfully!', data: newUser });
});

router.patch('/:id', validateSchema(updateSchema), async (req, res) => {
  const newUser = {
    ...res.locals.user,
    ...req.body,
  };
  await User.update(newUser, {
    where: {
      id: res.locals.user.id,
    },
  });

  res
    .status(201)
    .json({ message: 'User updated successfully!', data: newUser });
});

router.delete('/:id', async (req, res) => {
  await User.update({ isDeleted: true }, { where: { id: res.locals.user.id } });
  res.status(200).json({ message: `User with id=${req.params.id} deleted!` });
});

export default router;
