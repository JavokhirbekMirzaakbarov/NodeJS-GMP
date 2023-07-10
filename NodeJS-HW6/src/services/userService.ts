import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import User from '../db/models/userModel';
import { User as UserType } from '../config/types';

const saltRounds = 10;

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

  async login(login: string) {
    try {
      const user = await User.findAll({
        where: { login },
        raw: true,
      });
      return user;
    } catch (error) {
      return new Error(error);
    }
  }

  async createUser({ login, password, age }: UserType) {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = {
        login,
        password: hash,
        age,
        id: uuidv4(),
        isDeleted: false,
      };
      return await User.create(newUser);
    } catch (err) {
      return new Error(err);
    }
  }

  async updateUser(oldUser: UserType, newFields: Partial<UserType>) {
    let newUser;

    if (newFields?.password) {
      const hash = await bcrypt.hash(newFields.password, saltRounds);
      newUser = {
        ...oldUser,
        ...newFields,
        password: hash,
      };
    } else {
      newUser = {
        ...oldUser,
        ...newFields,
      };
    }

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
