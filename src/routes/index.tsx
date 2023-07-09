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
import SupplierDetail from 'pages/Adm/Supplier/SupplierDetail';
import DetailTicket from 'pages/Adm/DetailTicket/DetailTicket';
import TicketHistory from 'pages/User/TicketHistory/TicketHistory';
import TicketHistoryDetail from 'pages/User/TicketHistoryDetail/TicketHistoryDetail';
import { ERole } from 'enums';
import ReportExport from 'pages/Adm/Report/ReportExport/ReportExport';
import Unit from 'pages/Adm/Extension/Unit/Unit';
import Group from 'pages/Adm/Extension/Group/Group';
import ReportRefund from 'pages/Adm/Report/ReportRefund/ReportRefund';
import ReportInventory from 'pages/Adm/Report/ReportInventory/ReportInventory';
import ReportBidding from 'pages/Adm/Report/ReportBidding/ReportBidding';
import Analysis from 'pages/Adm/Analysis/Analysis';
import StaffManage from 'pages/Adm/StaffManage/StaffManage';
import Debt from 'pages/Adm/Debt/Debt';

export const routers: any = [
  {
    name: 'Login',
    element: <Login />,
    public: true,
    path: '/login',
    role: [ERole.User, ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'ADM_HOME',
    element: <Home />,
    public: false,
    path: MPath.ADM_HOME,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'AdmBiddingSuppy',
    element: <BiddingSupply />,
    public: false,
    path: MPath.ADM_BIDDING,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'AdmAddSuppy',
    element: <AddSupply />,
    public: false,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    path: MPath.ADM_ADD_SUPPLY,
    exact: true,
  },
  {
    name: 'AdmDebt',
    element: <Debt />,
    public: false,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    path: MPath.ADM_DEBT,
    exact: true,
  },
  {
    name: 'AdmDepot',
    element: <Store />,
    public: false,
    path: MPath.ADM_DEPOT,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'AdmDepartmentDetail',
    element: <AccountManage />,
    public: false,
    path: MPath.ADM_DEPARTMENT_DETAIL,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'AdmDepartment',
    element: <DepartmentManage />,
    public: false,
    path: MPath.ADM_DEPARTMENT,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'AdmListTicket',
    element: <ListTicket />,
    public: false,
    path: MPath.ADM_LIST_TICKET,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'AdmDetailTicket',
    element: <DetailTicket />,
    public: false,
    path: MPath.ADM_DETAIL_TICKET,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  // Supplier
  {
    name: 'AdmSupplier',
    element: <Supplier />,
    public: false,
    path: MPath.ADM_SUPPLIER,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'AdmSupplierDetail',
    element: <SupplierDetail />,
    public: false,
    path: MPath.ADM_SUPPLIER_DETAIL,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },

  //report
  {
    name: 'ReportExport',
    element: <ReportExport />,
    public: false,
    path: MPath.ADM_REPORT_EXPORT,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'ReportRefund',
    element: <ReportRefund />,
    public: false,
    path: MPath.ADM_REPORT_REFUND,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'ReportInventory',
    element: <ReportInventory />,
    public: false,
    path: MPath.ADM_REPORT_INVENTORY,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'ReportBidding',
    element: <ReportBidding />,
    public: false,
    path: MPath.ADM_REPORT_BIDDING,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  //extension
  {
    name: 'ExtensionUnit',
    element: <Unit />,
    public: false,
    path: MPath.ADM_EXTENSION_UNIT,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'ExtensionGroup',
    element: <Group />,
    public: false,
    path: MPath.ADM_EXTENSION_GROUP,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'Analysis',
    element: <Analysis />,
    public: false,
    path: MPath.ADM_ANALYSIS,
    role: [ERole.Admin, ERole.Staff_Accept, ERole.Staff_Report],
    exact: true,
  },
  {
    name: 'StaffManage',
    element: <StaffManage />,
    public: false,
    path: MPath.ADM_STAFF,
    role: [ERole.Admin],
    exact: true,
  },

  // User ---------------------------------------------------------------
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
  {
    name: 'USER_TICKET_HISTORY',
    element: <TicketHistory />,
    public: false,
    path: MPath.USER_TICKET_HISTORY,
    role: [ERole.User],
    exact: true,
  },
  {
    name: 'USER_TICKET_HISTORY_DETAIL',
    element: <TicketHistoryDetail />,
    public: false,
    path: MPath.USER_TICKET_HISTORY_DETAIL,
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
