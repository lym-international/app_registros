import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  
  
  
  
  
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [],
  },

  // Admin Modules
  {
    path: '',
    title: 'MENUITEMS.DASHBOARD.TEXT',
    iconType: 'feather',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/dashboard/main',
        title: 'MENUITEMS.DASHBOARD.LIST.DASHBOARD1',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/dashboard/dashboard2',
        title: 'MENUITEMS.DASHBOARD.LIST.DASHBOARD2',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.PROJECTS.TEXT',
    iconType: 'feather',
    icon: 'book',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/projects/allProjects',
        title: 'MENUITEMS.PROJECTS.LIST.ALL-PROJECTS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/projects/addProject',
        title: 'MENUITEMS.PROJECTS.LIST.ADD-PROJECT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/projects/estimates',
        title: 'MENUITEMS.PROJECTS.LIST.ESTIMATES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/projects/projectDetails',
        title: 'MENUITEMS.PROJECTS.LIST.PROJECT-DETAILS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.EMPLOYEES.TEXT',
    iconType: 'feather',
    icon: 'users',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/employees/allEmployees',
        title: 'MENUITEMS.EMPLOYEES.LIST.ALL-EMPLOYEE',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/employees/add-employee',
        title: 'MENUITEMS.EMPLOYEES.LIST.ADD-EMPLOYEE',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/employees/edit-employee',
        title: 'MENUITEMS.EMPLOYEES.LIST.EDIT-EMPLOYEE',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/employees/employee-profile',
        title: 'MENUITEMS.EMPLOYEES.LIST.PROFILE',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.LEAVES.TEXT',
    iconType: 'feather',
    icon: 'trello',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/leaves/leave-requests',
        title: 'MENUITEMS.LEAVES.LIST.LEAVE-REQUESTS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        submenu: [],
      },
      {
        path: '/admin/leaves/leave-balance',
        title: 'MENUITEMS.LEAVES.LIST.LEAVE-BALANCE',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        submenu: [],
      },
      {
        path: '/admin/leaves/leave-types',
        title: 'MENUITEMS.LEAVES.LIST.LEAVE-TYPES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.HOLIDAYS.TEXT',
    iconType: 'feather',
    icon: 'coffee',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/holidays/all-holidays',
        title: 'MENUITEMS.HOLIDAYS.LIST.ALL-HOLIDAYS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        submenu: [],
      },
      {
        path: '/admin/holidays/add-holiday',
        title: 'MENUITEMS.HOLIDAYS.LIST.ADD-HOLIDAY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        submenu: [],
      },
      {
        path: '/admin/holidays/edit-holiday',
        title: 'MENUITEMS.HOLIDAYS.LIST.EDIT-HOLIDAY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.ATTENDANCE.TEXT',
    iconType: 'feather',
    icon: 'edit',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/attendance/today',
        title: 'MENUITEMS.ATTENDANCE.LIST.TODAY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        submenu: [],
      },
      {
        path: '/admin/attendance/employee',
        title: 'MENUITEMS.ATTENDANCE.LIST.EMPLOYEE',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        submenu: [],
      },
      {
        path: '/admin/attendance/attendance-sheet',
        title: 'MENUITEMS.ATTENDANCE.LIST.SHEET',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: ['Admin'],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.CLIENTS.TEXT',
    iconType: 'feather',
    icon: 'user',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/clients/all-clients',
        title: 'MENUITEMS.CLIENTS.LIST.ALL-CLIENTS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/clients/add-client',
        title: 'MENUITEMS.CLIENTS.LIST.ADD-CLIENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/clients/edit-client',
        title: 'MENUITEMS.CLIENTS.LIST.EDIT-CLIENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.ACCOUNTS.TEXT',
    iconType: 'feather',
    icon: 'book-open',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/accounts/all-payment',
        title: 'MENUITEMS.ACCOUNTS.LIST.ALL-PAYMENTS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/accounts/add-payment',
        title: 'MENUITEMS.ACCOUNTS.LIST.ADD-PAYMENT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/accounts/invoice',
        title: 'MENUITEMS.ACCOUNTS.LIST.INVOICE',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.PAYROLL.TEXT',
    iconType: 'feather',
    icon: 'clipboard',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/payroll/employee-salary',
        title: 'MENUITEMS.PAYROLL.LIST.EMPLOYEE_SALARY',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/payroll/payslip',
        title: 'MENUITEMS.PAYROLL.LIST.PAYSLIP',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },

  {
    path: '/admin/leads',
    title: 'MENUITEMS.LEADERS.TEXT',
    iconType: 'feather',
    icon: 'users',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [],
  },
  {
    path: '',
    title: 'MENUITEMS.JOBS.TEXT',
    iconType: 'feather',
    icon: 'award',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/jobs/jobs-list',
        title: 'MENUITEMS.JOBS.LIST.JOBS_LIST',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/jobs/resumes',
        title: 'MENUITEMS.JOBS.LIST.RESUMES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/jobs/candidates',
        title: 'MENUITEMS.JOBS.LIST.CANDIDATES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/jobs/shortlist',
        title: 'MENUITEMS.JOBS.LIST.SHORTLIST_CANDIDATES',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.REPORTS.TEXT',
    iconType: 'feather',
    icon: 'file-text',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/reports/leave-report',
        title: 'MENUITEMS.REPORTS.LIST.LEAVE_REPORT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/reports/expense-report',
        title: 'MENUITEMS.REPORTS.LIST.EXPENSE_REPORT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },

  // Employee Modules
  {
    path: '/employee/dashboard',
    title: 'MENUITEMS.EMPLOYEE.DASHBOARD',
    iconType: 'feather',
    icon: 'airplay',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Employee'],
    submenu: [],
  },
  {
    path: '/employee/attendance',
    title: 'MENUITEMS.EMPLOYEE.ATTENDANCE',
    iconType: 'feather',
    icon: 'edit',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Employee'],
    submenu: [],
  },
  {
    path: '/employee/myleaves',
    title: 'MENUITEMS.EMPLOYEE.MY-LEAVES',
    iconType: 'feather',
    icon: 'file-text',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Employee'],
    submenu: [],
  },
  {
    path: '/employee/myteam',
    title: 'MENUITEMS.EMPLOYEE.MYTEAM',
    iconType: 'feather',
    icon: 'users',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Employee'],
    submenu: [],
  },
  {
    path: '/employee/myprojects',
    title: 'MENUITEMS.EMPLOYEE.MYPROJECTS',
    iconType: 'feather',
    icon: 'database',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Employee'],
    submenu: [],
  },
  {
    path: '/employee/mytasks',
    title: 'MENUITEMS.EMPLOYEE.MYTASKS',
    iconType: 'feather',
    icon: 'command',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Employee'],
    submenu: [],
  },
  {
    path: '/employee/settings',
    title: 'MENUITEMS.EMPLOYEE.SETTINGS',
    iconType: 'feather',
    icon: 'settings',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Employee'],
    submenu: [],
  },
  {
    path: '/employee/chat',
    title: 'MENUITEMS.EMPLOYEE.CHAT',
    iconType: 'feather',
    icon: 'message-square',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Employee'],
    submenu: [],
  },
  // Client Modules
  {
    path: '/client/dashboard',
    title: 'MENUITEMS.CLIENT.DASHBOARD',
    iconType: 'feather',
    icon: 'airplay',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Client'],
    submenu: [],
  },
  {
    path: '',
    title: 'MENUITEMS.CLIENT.PROJECTS.TEXT',
    iconType: 'feather',
    icon: 'book',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Client'],
    submenu: [
      {
        path: '/client/projects/myProjects',
        title: 'MENUITEMS.CLIENT.PROJECTS.LIST.MY-PROJECTS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/client/projects/projectDetails',
        title: 'MENUITEMS.CLIENT.PROJECTS.LIST.PROJECT-DETAILS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.CLIENT.SUPPORTS.TEXT',
    iconType: 'feather',
    icon: 'slack',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Client'],
    submenu: [
      {
        path: '/client/supports/tickets',
        title: 'MENUITEMS.CLIENT.SUPPORTS.LIST.TICKETS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/client/supports/ticketDetails',
        title: 'MENUITEMS.CLIENT.SUPPORTS.LIST.TICKET-DETAILS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },

  {
    path: '/client/billing',
    title: 'MENUITEMS.CLIENT.BILLING',
    iconType: 'feather',
    icon: 'file-text',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Client'],
    submenu: [],
  },
  {
    path: '/client/chat',
    title: 'MENUITEMS.CLIENT.CHAT',
    iconType: 'feather',
    icon: 'message-circle',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Client'],
    submenu: [],
  },
  {
    path: '/client/settings',
    title: 'MENUITEMS.CLIENT.SETTINGS',
    iconType: 'feather',
    icon: 'settings',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Client'],
    submenu: [],
  },

  // Common Modules

  {
    path: '',
    title: 'Apps',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [],
  },
  {
    path: 'calendar',
    title: 'Calendar',
    iconType: 'feather',
    icon: 'calendar',
    class: '',
    groupTitle: false,
    badge: 'New',
    badgeClass: 'badge bg-blue sidebar-badge float-end',
    role: [''],
    submenu: [],
  },
  {
    path: 'task',
    title: 'Task',
    iconType: 'feather',
    icon: 'check-circle',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [],
  },
  {
    path: 'contacts',
    title: 'Contacts',
    iconType: 'feather',
    icon: 'user-plus',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [],
  },
  {
    path: '',
    title: 'Email',
    iconType: 'feather',
    icon: 'mail',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/email/inbox',
        title: 'Inbox',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/email/compose',
        title: 'Compose',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/email/read-mail',
        title: 'Read Email',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'More Apps',
    iconType: 'feather',
    icon: 'star',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '4',
    badgeClass: 'badge bg-orange sidebar-badge float-end',
    role: [''],
    submenu: [
      {
        path: '/apps/chat',
        title: 'Chat',
        iconType: 'feather',
        icon: 'chat',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/apps/dragdrop',
        title: 'Drag & Drop',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/apps/contact-grid',
        title: 'Contact Grid',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/apps/support',
        title: 'Support',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Widgets',
    iconType: 'feather',
    icon: 'gift',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/widget/chart-widget',
        title: 'Chart Widget',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/widget/data-widget',
        title: 'Data Widget',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Components',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [],
  },
  {
    path: '',
    title: 'User Interface (UI)',
    iconType: 'feather',
    icon: 'copy',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/ui/alerts',
        title: 'Alerts',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/badges',
        title: 'Badges',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/chips',
        title: 'Chips',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/modal',
        title: 'Modal',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/buttons',
        title: 'Buttons',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/expansion-panel',
        title: 'Expansion Panel',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/bottom-sheet',
        title: 'Bottom Sheet',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/dialogs',
        title: 'Dialogs',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/cards',
        title: 'Cards',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/labels',
        title: 'Labels',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/list-group',
        title: 'List Group',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/snackbar',
        title: 'Snackbar',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/preloaders',
        title: 'Preloaders',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/progressbars',
        title: 'Progress Bars',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/tabs',
        title: 'Tabs',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/typography',
        title: 'Typography',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/ui/helper-classes',
        title: 'Helper Classes',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Forms',
    iconType: 'feather',
    icon: 'layout',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/forms/form-controls',
        title: 'Form Controls',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/forms/advance-controls',
        title: 'Advanced Controls',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/forms/form-example',
        title: 'Form Examples',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/forms/form-validation',
        title: 'Form Validation',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/forms/wizard',
        title: 'Form Wizard',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/forms/editors',
        title: 'Editors',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Tables',
    iconType: 'feather',
    icon: 'grid',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/tables/basic-tables',
        title: 'Basic Tables',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/tables/material-tables',
        title: 'Material Tables',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/tables/ngx-datatable',
        title: 'ngx-datatable',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Charts',
    iconType: 'feather',
    icon: 'pie-chart',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '7',
    badgeClass: 'badge bg-green sidebar-badge float-end',
    role: [''],
    submenu: [
      {
        path: '/charts/echart',
        title: 'Echart',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/charts/apex',
        title: 'Apex',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/charts/chartjs',
        title: 'ChartJS',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/charts/ngx-charts',
        title: 'Ngx-Charts',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/charts/gauge',
        title: 'Gauge',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Timeline',
    iconType: 'feather',
    icon: 'git-merge',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/timeline/timeline1',
        title: 'Timeline 1',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/timeline/timeline2',
        title: 'Timeline 2',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Icons',
    iconType: 'feather',
    icon: 'feather',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/icons/material',
        title: 'Material Icons',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/icons/font-awesome',
        title: 'Font Awesome',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Authentication',
    iconType: 'feather',
    icon: 'user-check',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/authentication/signin',
        title: 'Sign In',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/authentication/signup',
        title: 'Sign Up',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/authentication/forgot-password',
        title: 'Forgot Password',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/authentication/locked',
        title: 'Locked',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/authentication/page404',
        title: '404 - Not Found',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/authentication/page500',
        title: '500 - Server Error',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Extra Pages',
    iconType: 'feather',
    icon: 'anchor',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/extra-pages/profile',
        title: 'Profile',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/extra-pages/pricing',
        title: 'Pricing',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/extra-pages/invoice',
        title: 'Invoice',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/extra-pages/faqs',
        title: 'Faqs',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/extra-pages/blank',
        title: 'Blank Page',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Maps',
    iconType: 'feather',
    icon: 'map-pin',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/maps/google',
        title: 'Google Map',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Multi level Menu',
    iconType: 'feather',
    icon: 'chevrons-down',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [''],
    submenu: [
      {
        path: '/multilevel/first1',
        title: 'First',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/',
        title: 'Second',
        iconType: '',
        icon: '',
        class: 'ml-sub-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [
          {
            path: '/multilevel/secondlevel/second1',
            title: 'Second 1',
            iconType: '',
            icon: '',
            class: 'ml-menu2',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            role: [''],
            submenu: [],
          },
          {
            path: '/',
            title: 'Second 2',
            iconType: '',
            icon: '',
            class: 'ml-sub-menu2',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            role: [''],
            submenu: [
              {
                path: '/multilevel/thirdlevel/third1',
                title: 'third 1',
                iconType: '',
                icon: '',
                class: 'ml-menu3',
                groupTitle: false,
                badge: '',
                badgeClass: '',
                role: [''],
                submenu: [],
              },
            ],
          },
        ],
      },
      {
        path: '/multilevel/first3',
        title: 'Third',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
];
