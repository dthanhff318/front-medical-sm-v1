import { TDepartment } from 'types/department';

export type TInitDepartmentState = {
  departmentList: Array<TDepartment>;
  departmentDetail: TDepartment;
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

// Bidding
export type TInitBiddingState = {
  listBidding: Array<any>;
  loading: boolean;
  findBidding: Array<any>;
  findLoading: boolean;
};

// Supplier
export type TInitSupplierState = {
  suppliers: Array<any>;
  loading: boolean;
};

// Store
export type TInitStoreState = {
  loading: boolean;
  stores: Array<any>;
};
