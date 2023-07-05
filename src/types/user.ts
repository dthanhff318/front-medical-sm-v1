import { ERole } from 'enums';
export type TUser = {
  id?: number;
  displayName?: string;
  department?: number;
  role?: ERole;
};
