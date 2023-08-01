// @ts-nocheck
import * as GroupService from '../../services/groupService';
import {
  addGroup,
  editGroup,
  getAllGroups,
  getGroupById,
  removeGroup,
} from '../../controllers/groupController';

const group = {
  id: '123',
  name: 'TestGroup',
  permission: ['READ'],
};

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  sendStatus: jest.fn(),
};

const mockReq = {
  query: {},
  body: {},
  params: {
    id: '',
  },
};

describe('GroupsController', () => {
  afterEach(jest.clearAllMocks);

  it('should return the array of groups', async () => {
    const userSpyGet = jest.spyOn(GroupService, 'getAll');
    userSpyGet.mockResolvedValueOnce([group]);
    await getAllGroups(mockReq, mockRes);
    expect(userSpyGet).toBeCalled();
    expect(userSpyGet).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith([group]);
  });

  it('should return group by id', async () => {
    const req = { ...mockReq };
    req.params.id = group.id;

    const userSpyFind = jest.spyOn(GroupService, 'findGroupById');
    userSpyFind.mockResolvedValueOnce(group);
    await getGroupById(req, mockRes);

    expect(userSpyFind).toBeCalled();
    expect(userSpyFind).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith(group);
  });

  it('should add group and return added group', async () => {
    const req = { ...mockReq };
    req.body = group;

    const userSpyCreate = jest.spyOn(GroupService, 'createGroup');
    userSpyCreate.mockResolvedValueOnce(group);
    await addGroup(req, mockRes);

    expect(userSpyCreate).toBeCalled();
    expect(userSpyCreate).toBeCalledTimes(1);
    expect(mockRes.json).toHaveBeenCalledWith(group);
  });

  it('should update group', async () => {
    const req = { ...mockReq };
    req.body = group;
    req.params.id = group.id;

    const userSpyUpdate = jest.spyOn(GroupService, 'updateGroup');
    userSpyUpdate.mockResolvedValueOnce(group);
    await editGroup(req, mockRes);

    expect(userSpyUpdate).toBeCalled();
    expect(userSpyUpdate).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith(group);
  });

  it('should remove group', async () => {
    const req = { ...mockReq };
    const result = { message: `Group had been deleted` };
    req.params.id = group.id;

    const userSpyRemove = jest.spyOn(GroupService, 'deleteGroupById');
    userSpyRemove.mockResolvedValueOnce([group]);
    await removeGroup(req, mockRes);

    expect(userSpyRemove).toBeCalled();
    expect(userSpyRemove).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith(result);
  });
});
