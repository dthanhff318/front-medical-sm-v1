export type TInitState = {
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
