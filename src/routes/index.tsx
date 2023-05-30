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
import HomeUser from 'pages/User/HomeUser/HomeUser';
import Plan from 'pages/User/Plan/Plan';
import Refund from 'pages/User/Refund/Refund';
import StoreDepartment from 'pages/User/StoreDepartment/StoreDepartment';
import Supplier from 'pages/Adm/Supplier/Supplier';
import ListTicket from 'pages/Adm/ListTicket/ListTicket';
import { ERole } from 'enums';
import SupplierDetail from 'pages/Adm/Supplier/SupplierDetail';
import DetailTicket from 'pages/Adm/DetailTicket/DetailTicket';

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
    name: 'AdmListTicket',
    element: <ListTicket />,
    public: false,
    path: MPath.ADM_LIST_TICKET,
    role: [ERole.Admin],
    exact: true,
  },
  {
    name: 'AdmDetailTicket',
    element: <DetailTicket />,
    public: false,
    path: MPath.ADM_DETAIL_TICKET,
    role: [ERole.Admin],
    exact: true,
  },
  // Supplier
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
    element: <HomeUser />,
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
