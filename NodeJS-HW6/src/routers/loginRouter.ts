import { User } from '../config/types';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';
import UserService from '../services/userService';

const userService = new UserService();

const router = Router();

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const user = (await userService.getUser(login, password)) as unknown as User;

  if (user) {
    const token = jwt.sign(
      { username: user?.login, password: user.password },
      JWT_SECRET,
      { expiresIn: 10000 },
    );

    res.status(200).json({ token });
  } else {
    res.status(403).json({ success: false, message: 'Bad request' });
  }
});

export default router;
