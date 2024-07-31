import { User } from "./user";

export interface AddUserData extends Omit<User, '_id'> {};