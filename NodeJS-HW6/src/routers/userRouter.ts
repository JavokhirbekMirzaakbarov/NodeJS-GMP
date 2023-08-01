import { Router } from 'express';
import { authenticateJWT } from '../auth/checkToken';
import {
  addUser,
  editUser,
  getAllUsers,
  getById,
  removeUser,
} from '../controllers/userController';

export const router = Router();

router.get('/', authenticateJWT, getAllUsers);
router.get('/:id', authenticateJWT, getById);
router.post('/', authenticateJWT, addUser);
router.put('/:id', authenticateJWT, editUser);
router.delete('/:id', authenticateJWT, removeUser);
