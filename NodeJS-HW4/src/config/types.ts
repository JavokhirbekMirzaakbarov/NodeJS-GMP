export type User = {
  id: any;
  login: string;
  password: string;
  age?: number;
  isDeleted: boolean;
};

export type Group = {
  id: any;
  name: string;
  permissions: Array<string>;
};
