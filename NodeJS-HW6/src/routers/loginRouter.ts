import { User } from '../config/types';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';
import UserService from '../services/userService';

const userService = new UserService();

const router = Router();

const checkPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

router.post('/', async (req, res) => {
  try {
    const { login, password } = req.body;
    const users = (await userService.login(login)) as unknown as User[];

    if (users.length)
      users.forEach(async (user) => {
        if (await checkPassword(password, user.password)) {
          const token = jwt.sign(
            { username: user.login, password: user.password },
            JWT_SECRET,
            { expiresIn: 10000 },
          );
          res.status(200).json({ token });
        } else {
          res.status(200).json({ success: false, message: 'Bad combination' });
        }
      });
    else res.status(200).json({ success: false, message: 'Bad combination' });
  } catch (error) {
    res.status(403).json({ success: false, message: 'Bad request' });
  }
});

export default router;
