import { TUser } from './user';

export type TDepartment = {
  id?: number;
  name?: string;
  location?: string;
  member?: Array<TUser>;
  phone?: string;
  owner?: TUser;
};
