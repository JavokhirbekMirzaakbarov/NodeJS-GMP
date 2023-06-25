import { Router } from 'express';
import { userGroupSchema } from '../config/schemas';
import { addUsersToGroup, getAll } from '../services/userGroupService';
import { validateSchema } from '../utils/helpers';
import { AppError } from '../middleware/logger/app-error';

const router = Router();

router.get('/', async (_, res) => {
  const data = await getAll();
  res.status(200).json(data);
});

router.post('/:id', validateSchema(userGroupSchema), async (req, res) => {
  const id = req.params.id;
  const userIds = req.body.userIds;
  const usersGroups = await addUsersToGroup(id, userIds);
  if (usersGroups)
    res
      .status(200)
      .json({ message: 'Users added successfully!', data: usersGroups });
  else {
    const errorMessage = `New bind did not get saved!`;
    res.status(200).json({ message: errorMessage });
    throw new AppError(400, errorMessage, 'POST', req.body);
  }
});

export default router;
