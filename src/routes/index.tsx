import React from 'react';
import Notfound from '../pages/Notfound';
import Home from '../pages/AdmHome';
import Login from 'pages/Login/Login';
import BiddingSupply from 'pages/Adm/BiddingSupply/BiddingSupply';
import MPath from './routes';
import AddSupply from 'pages/Adm/AddSupply/AddSupply';
import AccountManage from 'pages/Adm/AccountManage/AccountManage';
import DepartmentManage from 'pages/Adm/DepartmentManage/DepartmentManage';

export const routers: any = [
  {
    name: 'Login',
    element: <Login />,
    public: true,
    path: '/login',
    role: [],
    exact: true,
  },
  {
    name: 'Home',
    element: <Home />,
    public: true,
    path: '/',
    exact: true,
  },
  {
    name: 'AdmBiddingSuppy',
    element: <BiddingSupply />,
    public: false,
    path: MPath.ADM_BIDDING,
    exact: true,
  },
  {
    name: 'AdmAddSuppy',
    element: <AddSupply />,
    public: false,
    path: MPath.ADM_ADD_SUPPLY,
    exact: true,
  },
  {
    name: 'AdmDepartmentDetail',
    element: <AccountManage />,
    public: false,
    path: MPath.ADM_DEPARTMENT_DETAIL,
    exact: true,
  },
  {
    name: 'AdmDepartment',
    element: <DepartmentManage />,
    public: false,
    path: MPath.ADM_DEPARTMENT,
    exact: true,
  },
  {
    name: 'Notfound',
    element: <Notfound />,
    public: true,
    path: '/notfound',
    exact: true,
  },
];
