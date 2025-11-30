import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayComponent } from './today/today.component';
import { EmployeeComponent } from './employee/employee.component';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';

const routes: Routes = [
  {
    path: 'today',
    component: TodayComponent,
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: 'attendance-sheet',
    component: AttendanceSheetComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {}
