import { Router, Response } from 'express';
import { groupSchema, updateGroupSchema } from '../config/schemas';
import { validateSchema } from '../utils/helpers';
import { AppErrors } from '../logger/app-errors';
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
  if (!group) {
    const errorMessage = `Group with id ${id} not found!`;
    res.status(400).json(errorMessage);
    throw new AppErrors(400, errorMessage, 'GET');
  }
  res.locals.group = group;
  next();
});

router.get('/', async (_, res) => {
  const groups = await getAllGroups();
  res.status(200).json(groups);
});

router.get('/:id', (_, res) => {
  res.status(200).json(res.locals.group);
});

router.post('/', validateSchema(groupSchema), async (req, res) => {
  const newGroup = await createGroup(req.body);
  if (newGroup)
    res
      .status(201)
      .json({ message: 'New group created successfully!', data: newGroup });
  else {
    const errorMessage = 'Group not saved!';
    res.status(200).json({ message: errorMessage });
    throw new AppErrors(400, errorMessage, 'POST');
  }
});

router.patch('/:id', validateSchema(updateGroupSchema), async (req, res) => {
  const updatedGroup = await updateGroup(res.locals.group, req.body);
  if (updatedGroup)
    res
      .status(201)
      .json({ message: 'Group updated successfully!', data: updatedGroup });
  else {
    const errorMessage = 'User did not get updated!';
    res.status(200).json({ message: errorMessage });
    throw new AppErrors(400, errorMessage, 'PATCH');
  }
});

router.delete('/:id', async (req, res) => {
  const deletedGroup = await deleteGroupById(res.locals.group.id);
  if (deletedGroup)
    res
      .status(200)
      .json({ message: `Group with id=${req.params.id} deleted!` });
  else {
    res.status(200).json({ message: 'Something went wrong!' });
    throw new AppErrors(400, 'Group had NOT been deleted!', 'DELETE');
  }
});

export default router;
