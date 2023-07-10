export interface User {
  id: string;
  login: string;
  password: string;
  age?: number;
  isDeleted: boolean;
}

export type Group = {
  id: string;
  name: string;
  permissions: Array<string>;
};
