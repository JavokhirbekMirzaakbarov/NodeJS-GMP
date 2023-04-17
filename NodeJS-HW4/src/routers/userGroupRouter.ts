import { Router } from 'express';
import { userGroupSchema } from '../config/schemas';
import { addUsersToGroup, getAll } from '../services/userGroupService';
import { validateSchema } from '../utils/helpers';

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
    const error = 'could not perform!';
    res.status(404).json({ message: error });
  }
});

export default router;
