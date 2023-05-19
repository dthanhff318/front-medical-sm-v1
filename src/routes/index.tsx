import React from 'react';
import Notfound from '../pages/Notfound';
import Login from 'pages/Login/Login';
import BiddingSupply from 'pages/Adm/BiddingSupply/BiddingSupply';
import MPath from './routes';
import AddSupply from 'pages/Adm/AddSupply/AddSupply';
import AccountManage from 'pages/Adm/AccountManage/AccountManage';
import DepartmentManage from 'pages/Adm/DepartmentManage/DepartmentManage';
import Home from 'pages/Adm/Home/Home';
import Store from 'pages/Adm/Store/Store';
import UserHome from 'pages/User/UserHome';
import Plan from 'pages/User/Plan/Plan';
import Refund from 'pages/User/Refund/Refund';
import StoreDepartment from 'pages/User/StoreDepartment/StoreDepartment';
import Supplier from 'pages/Adm/Supplier/Supplier';
import ExportSupply from 'pages/Adm/ExportSupply/ExportSupply';
import { ERole } from 'enums';
import SupplierDetail from 'pages/Adm/Supplier/SupplierDetail';

export const routers: any = [
  {
    name: 'Login',
    element: <Login />,
    public: true,
    path: '/login',
    role: [ERole.User, ERole.Admin],
    exact: true,
  },
  {
    name: 'ADM_HOME',
    element: <Home />,
    public: false,
    path: MPath.ADM_HOME,
    role: [ERole.Admin],
    exact: true,
  },
  {
    name: 'AdmBiddingSuppy',
    element: <BiddingSupply />,
    public: false,
    path: MPath.ADM_BIDDING,
    role: [ERole.Admin],
    exact: true,
  },
  {
    name: 'AdmAddSuppy',
    element: <AddSupply />,
    public: false,
    role: [ERole.Admin],
    path: MPath.ADM_ADD_SUPPLY,
    exact: true,
  },
  {
    name: 'AdmDepot',
    element: <Store />,
    public: false,
    path: MPath.ADM_DEPOT,
    role: [ERole.Admin],
    exact: true,
  },
  {
    name: 'AdmDepartmentDetail',
    element: <AccountManage />,
    public: false,
    path: MPath.ADM_DEPARTMENT_DETAIL,
    role: [ERole.Admin],
    exact: true,
  },
  {
    name: 'AdmDepartment',
    element: <DepartmentManage />,
    public: false,
    path: MPath.ADM_DEPARTMENT,
    role: [ERole.Admin],
    exact: true,
  },
  {
    name: 'AdmPlan',
    element: <ExportSupply />,
    public: false,
    path: MPath.ADM_PLAN,
    role: [ERole.Admin],
    exact: true,
  },
  //supplier
  {
    name: 'AdmSupplier',
    element: <Supplier />,
    public: false,
    path: MPath.ADM_SUPPLIER,
    role: [ERole.Admin],
    exact: true,
  },
  {
    name: 'AdmSupplierDetail',
    element: <SupplierDetail />,
    public: false,
    path: MPath.ADM_SUPPLIER_DETAIL,
    role: [ERole.Admin],
    exact: true,
  },
  // User
  {
    name: 'USER_HOME',
    element: <UserHome />,
    public: false,
    path: MPath.USER_HOME,
    role: [ERole.User],
    exact: true,
  },
  {
    name: 'USER_PLAN',
    element: <Plan />,
    public: false,
    path: MPath.USER_PLAN,
    role: [ERole.User],
    exact: true,
  },
  {
    name: 'USER_REFUND',
    element: <Refund />,
    public: false,
    path: MPath.USER_REFUND,
    role: [ERole.User],
    exact: true,
  },
  {
    name: 'USER_STORE',
    element: <StoreDepartment />,
    public: false,
    path: MPath.USER_STORE,
    role: [ERole.User],
    exact: true,
  },
  // Not found
  {
    name: 'Notfound',
    element: <Notfound />,
    public: true,
    path: '/notfound',
    role: [ERole.User, ERole.Admin],
    exact: true,
  },
];
