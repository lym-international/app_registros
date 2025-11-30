import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './attendance/form/form.component';
import { MyTeamsComponent } from './myteam/myteam.component';
import { SettingsComponent } from './settings/settings.component';
import { AttendancesService } from './attendance/attendance.service';
import { AttendancesComponent } from './attendance/attendance.component';
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { FormDialogComponent } from './my-leaves/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './my-leaves/dialogs/delete/delete.component';
import { FormComponent as MyProjectFormDialog } from './my-projects/form/form.component';
import { MyLeavesService } from './my-leaves/my-leaves.service';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MyProjectsService } from './my-projects/my-projects.service';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { MyTasksService } from './my-tasks/my-tasks.service';
import { FormDialogComponent as myTaskFormDialogComponent } from './my-tasks/dialogs/form-dialog/form-dialog.component';
import { DeleteComponent as myTaskDeleteComponent } from './my-tasks/dialogs/delete/delete.component';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '@shared';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AttendancesComponent,
    FormComponent,
    MyTeamsComponent,
    SettingsComponent,
    MyLeavesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    MyProjectsComponent,
    MyProjectFormDialog,
    MyTasksComponent,
    myTaskFormDialogComponent,
    myTaskDeleteComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgScrollbarModule,
    NgApexchartsModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [
    AttendancesService,
    MyLeavesService,
    MyProjectsService,
    MyTasksService,
  ],
})
export class EmployeeModule {}
