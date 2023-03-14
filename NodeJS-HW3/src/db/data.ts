import { v4 as uuidv4 } from 'uuid';

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

const users: User[] = [
  {
    id: uuidv4(),
    login: 'login1',
    password: 'abc123',
    age: 20,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'login2',
    password: 'abc345',
    age: 25,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'login3',
    password: 'abc567',
    age: 30,
    isDeleted: false,
  },
];

export default users;
