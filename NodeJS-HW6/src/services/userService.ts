import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import User from '../db/models/userModel';
import { User as UserType } from '../config/types';

const saltRounds = 10;

export async function findUserById(id: string) {
  return await User.findByPk(id);
}

export async function getExistingUsers() {
  return await User.findAll({
    where: { isDeleted: false },
    raw: true,
  });
}

export async function login(login: string) {
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

export async function createUser({ login, password, age }: UserType) {
  const hash = await bcrypt.hash(password, saltRounds);
  const newUser = {
    login,
    password: hash,
    age,
    id: uuidv4(),
    isDeleted: false,
  };
  return await User.create(newUser);
}

export async function updateUser(newFields: Partial<UserType>, id: string) {
  let newUser;
  const oldUser = await findUserById(id);

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
      id: id,
    },
  });
}

export async function deleteUserById(id: string) {
  return await User.update({ isDeleted: true }, { where: { id } });
}

export async function getAutoSuggestUsers(loginSubstring: any, limit: any) {
  return User.findAll({
    limit: limit,
    where: { isDeleted: false, login: { [Op.startsWith]: loginSubstring } },
  });
}
