// @ts-nocheck
import {
  addUser,
  editUser,
  getAllUsers,
  getById,
  removeUser,
} from '../../controllers/userController';
import * as userService from '../../services/userService';

const user = {
  id: 'baf2423ke',
  login: 'Login',
  password: 'pas123',
  age: 21,
  isDeleted: false,
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

describe('UsersController', () => {
  afterEach(jest.clearAllMocks);

  it('should return array of users', async () => {
    const userSpy = jest.spyOn(userService, 'getExistingUsers');
    userSpy.mockResolvedValueOnce([user]);
    await getAllUsers(mockReq, mockRes);
    expect(userSpy).toBeCalled();
    expect(userSpy).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith([user]);
  });

  it('should return user by id', async () => {
    const req = { ...mockReq };
    req.params.id = user.id;
    const userSpy = jest.spyOn(userService, 'findUserById');
    userSpy.mockResolvedValueOnce(user);
    await getById(req, mockRes);

    expect(userSpy).toBeCalled();
    expect(userSpy).toBeCalledTimes(1);
  });
  it('should add user and return the user', async () => {
    const req = { ...mockReq };
    req.body = user;
    const userSpy = jest.spyOn(userService, 'createUser');
    userSpy.mockResolvedValueOnce(user);
    await addUser(req, mockRes);

    expect(userSpy).toBeCalled();
    expect(userSpy).toBeCalledTimes(1);
    expect(userSpy).toHaveBeenCalledWith(user);
  });

  it('should update user', async () => {
    const req = { ...mockReq };
    req.body = user;
    req.params.id = user.id;
    const userSpyUpdate = jest.spyOn(userService, 'updateUser');
    userSpyUpdate.mockResolvedValueOnce(user);
    await editUser(req, mockRes);

    expect(userSpyUpdate).toBeCalled();
    expect(userSpyUpdate).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith(user);
  });

  it('should remove user', async () => {
    const req = { ...mockReq };
    const result = { message: `User has been deleted!` };
    req.params.id = user.id;
    const userSpyRemove = jest.spyOn(userService, 'deleteUserById');
    userSpyRemove.mockResolvedValueOnce([user]);
    await removeUser(req, mockRes);
    expect(userSpyRemove).toBeCalled();
    expect(userSpyRemove).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith(result);
  });
});
