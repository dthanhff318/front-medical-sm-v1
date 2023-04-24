export type TInitDepartmentState = {
  departmentList: any;
  departmentDetail: any;
};

export type TGetDepartments = {
  page?: number;
  limit?: number;
};

export type TCreateDepartments = {
  name: string;
  location: string;
  phone: string;
};

export type TCreateUser = {
  username: string;
  password: string;
  displayName: string;
  department: number;
};

// auth
export type TUser = {
  id?: number;
  isAdmin?: boolean;
  department?: null | number;
  displayName?: string;
};
export type TInitAuthState = {
  isAuthenticated: boolean;
  currentUser: TUser;
  loading: boolean;
};

export type TLoginData = {
  username: string;
  password: string;
};
