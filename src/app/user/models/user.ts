export interface User {
  _id: string;
  name: string;
  age: number;
  login: string;
  password: string;
  userRoles: string[];
}