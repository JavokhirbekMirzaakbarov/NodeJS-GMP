import { v4 as uuidv4 } from 'uuid';
import User from '../db/models/userModel';
import { User as UserType } from '../db/data';

export default class UserService {
  async findUserById(id: string) {
    return await User.findByPk(id);
  }

  async getExistingUsers() {
    return await User.findAll({
      where: { isDeleted: false },
    });
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
}
