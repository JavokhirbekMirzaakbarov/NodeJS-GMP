import { Router, Response } from 'express';
import { groupSchema, updateGroupSchema } from '../config/schemas';
import { validateSchema } from '../utils/helpers';
import {
  createGroup,
  findGroupById,
  getAllGroups,
  updateGroup,
  deleteGroupById,
} from '../services/groupService';

const router = Router();

router.param('id', async (_, res: Response, next: () => void, id) => {
  const group = await findGroupById(id);
  if (!group)
    res.status(404).json({ message: `Group with id=${id} was not found!` });
  else {
    res.locals.group = group;
    next();
  }
});

router.get('/', async (_, res) => {
  const groups = await getAllGroups();
  res.status(200).json(groups);
});

router.get('/:id', (_, res) => {
  res.status(200).json(res.locals.group);
});

router.post('/', validateSchema(groupSchema), async (req, res) => {
  const result = await createGroup(req.body);
  res
    .status(201)
    .json({ message: 'New group created successfully!', data: result });
});

router.patch('/:id', validateSchema(updateGroupSchema), async (req, res) => {
  await updateGroup(res.locals.group, req.body);
  res.status(201).json({ message: 'Group updated successfully!' });
});

router.delete('/:id', async (req, res) => {
  await deleteGroupById(res.locals.group.id);
  res.status(200).json({ message: `Group with id=${req.params.id} deleted!` });
});

export default router;
