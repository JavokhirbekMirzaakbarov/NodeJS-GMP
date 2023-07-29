import { Router } from 'express';
import { authenticateJWT } from '../auth/checkToken';
import {
  addUserToGroup,
  getAllGroupsWithUsers,
} from '../controllers/userGroupController';

export const router = Router();

router.get('/', authenticateJWT, getAllGroupsWithUsers);
router.post('/:id', authenticateJWT, addUserToGroup);
