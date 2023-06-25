import { v4 as uuidv4 } from 'uuid';
import User from '../db/models/userModel';
import { User as UserType } from '../config/types';

export default class UserService {
  async findUserById(id: string) {
    return await User.findByPk(id);
  }

  async getExistingUsers() {
    return await User.findAll({
      where: { isDeleted: false },
      raw: true,
    });
  }

  async getUser(login: string, password: string) {
    const user = await User.findOne({
      where: { login, password },
    });
    return user;
  }

  async createUser({ login, password, age }: UserType) {
    const newUser = {
      login,
      password,
      age,
      id: uuidv4(),
      isDeleted: false,
    };
    return await User.create(newUser);
  }

  async updateUser(oldUser: UserType, newFields: Partial<UserType>) {
    const newUser = {
      ...oldUser,
      ...newFields,
    };
    return await User.update(newUser, {
      where: {
        id: oldUser.id,
      },
    });
  }

  async deleteUserById(id: string) {
    return await User.update({ isDeleted: true }, { where: { id } });
  }

  async filterUsers(users: UserType[], loginSubstring: string, limit: number) {
    return users
      .filter((user: UserType) => user.login.includes(`${loginSubstring}`))
      .slice(0, +limit);
  }
}
