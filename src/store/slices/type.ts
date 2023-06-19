import { ERole } from 'enums';
import { IndexedObject } from 'types/common';
import { TDepartment } from 'types/department';
import { TNoti } from 'types/noti';
import { TSupplier } from 'types/supplier';

export type TPagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

export type TInitDepartmentState = {
  departmentList: Array<TDepartment>;
  departmentDetail: TDepartment;
  pagination: TPagination;
  loading: 'department' | 'user' | '';
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
  role?: ERole;
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
  pagination: TPagination;
};

// Supplier
export type TGetSupplier = {
  page?: number;
  limit?: number;
  q?: string;
};
export type TInitSupplierState = {
  suppliers: Array<any>;
  supplierDetail: TSupplier;
  loading: boolean;
  pagination: TPagination;
};

// Store
export type TInitStoreState = {
  loading: boolean;
  stores: Array<any>;
  pagination: TPagination;
  storeDepartment: Array<any>;
};

// Plan
export type TInitPlanState = {
  loading: boolean;
  plans: Array<any>;
  planDetail: IndexedObject;
  pagination: TPagination;
};
//noti
export type TInitNotiState = {
  loading: boolean;
  notis: Array<TNoti>;
  dataFetch: {
    offset: number;
    hasMore: boolean;
    firstFetch: boolean;
  };
  numberSeen: number;
};
//unit
export type TInitUnitState = {
  units: Array<any>;
  loading: boolean;
  pagination: TPagination;
};
export type TCreateUnits = {
  name: string;
};
//group
export type TInitGroupState = {
  groups: Array<any>;
  loading: boolean;
  pagination: TPagination;
};
export type TCreateGroups = {
  name: string;
};