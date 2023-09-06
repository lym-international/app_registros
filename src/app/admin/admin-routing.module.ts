import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
  
  {
    path: 'dashboard-lm',
    loadChildren: () =>
      import('./dashboard-lm/dashboard-lm.module').then((m) => m.DashboardLmModule),
  },
  
  /*{
    path: 'admin-employees',
    loadChildren: () =>
      import('./employees/admin-employees/admin-employees.component').then((m) => m.AdminEmployeesComponent),
  },*/
  {
    path: 'search-order',
    loadChildren: () =>
      import('./search-order/search-order.module').then((m) => m.SearchOrderModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees.module').then((m) => m.EmployeesModule),
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/clients.module').then((m) => m.ClientModule),
  },
  {
    path: 'leaves',
    loadChildren: () =>
      import('./leaves/leaves.module').then((m) => m.LeavesModule),
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./accounts/accounts.module').then((m) => m.AccountsModule),
  },
  {
    path: 'holidays',
    loadChildren: () =>
      import('./holidays/holidays.module').then((m) => m.HolidayModule),
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./attendance/attendance.module').then((m) => m.AttendanceModule),
  },
  {
    path: 'payroll',
    loadChildren: () =>
      import('./payroll/payroll.module').then((m) => m.PayrollModule),
  },
  {
    path: 'leads',
    loadChildren: () =>
      import('./leads/leads.module').then((m) => m.LeadsModule),
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then((m) => m.JobsModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
