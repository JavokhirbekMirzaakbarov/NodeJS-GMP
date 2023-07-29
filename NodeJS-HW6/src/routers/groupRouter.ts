import { Router } from 'express';
import { authenticateJWT } from '../auth/checkToken';
import {
  addGroup,
  editGroup,
  getAllGroups,
  getGroupById,
  removeGroup,
} from '../controllers/groupController';

export const router = Router();

router.get('/', authenticateJWT, getAllGroups);
router.get('/:id', authenticateJWT, getGroupById);
router.post('/', authenticateJWT, addGroup);
router.put('/:id', authenticateJWT, editGroup);
router.delete('/:id', authenticateJWT, removeGroup);
