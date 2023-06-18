const MPath = {
  LOGIN: '/login',
  // Admin
  ADM_HOME: '/adm',
  ADM_BIDDING: '/adm/bidding',
  ADM_ADD_SUPPLY: '/adm/add/supply',
  ADM_DEPARTMENT: '/adm/department',
  ADM_SUPPLIER: '/adm/supplier',
  ADM_SUPPLIER_DETAIL: '/adm/supplier/:id',
  ADM_DEPOT: '/adm/depot',
  ADM_DEPARTMENT_DETAIL: '/adm/department/:id',
  ADM_LIST_TICKET: '/adm/ticket',
  ADM_DETAIL_TICKET: '/adm/ticket/:id',
  ADM_REPORT_EXPORT: '/adm/report/export',
  ADM_EXTENSION_UNIT: '/adm/extension/unit',
  ADM_EXTENSION_GROUP: '/adm/extension/group',

  // User
  USER_HOME: '/',
  USER_PLAN: '/plan',
  USER_REFUND: '/refund',
  USER_STORE: '/store/department',
  USER_TICKET_HISTORY: '/store/ticket-history',
  USER_TICKET_HISTORY_DETAIL: '/store/ticket-history/:id',
};

export default MPath;
