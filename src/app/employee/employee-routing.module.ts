import { Page404Component } from '../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendancesComponent } from './attendance/attendance.component';
import { MyTeamsComponent } from './myteam/myteam.component';
import { SettingsComponent } from './settings/settings.component';
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'attendance',
    component: AttendancesComponent,
  },
  {
    path: 'myteam',
    component: MyTeamsComponent,
  },
  {
    path: 'myprojects',
    component: MyProjectsComponent,
  },
  {
    path: 'mytasks',
    component: MyTasksComponent,
  },
  {
    path: 'myleaves',
    component: MyLeavesComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
