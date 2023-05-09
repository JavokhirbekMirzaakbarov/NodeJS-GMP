import { Router, Response } from 'express';
import { groupSchema, updateGroupSchema } from '../config/schemas';
import { validateSchema } from '../utils/helpers';
import { AppError } from '../logger/app-error';
import {
  createGroup,
  findGroupById,
  getAllGroups,
  updateGroup,
  deleteGroupById,
} from '../services/groupService';

const router = Router();

router.param(
  'id',
  async (_, res: Response, next: (err?: Error) => void, id) => {
    try {
      const group = await findGroupById(id);
      res.locals.group = group;
      next();
    } catch (error) {
      next(
        new AppError(400, `Group with id ${id} not found!`, 'GET GROUP', {
          id,
        }),
      );
    }
  },
);

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
    const errorMessage = `Group not saved!`;
    res.status(200).json({ message: errorMessage });
    throw new AppError(400, errorMessage, 'POST', req.body);
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
    throw new AppError(400, errorMessage, 'PATCH');
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
    throw new AppError(400, 'Group had NOT been deleted!', 'DELETE', {
      id: res.locals.group.id,
    });
  }
});

export default router;
