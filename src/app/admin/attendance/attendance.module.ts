import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { TodayComponent } from './today/today.component';
import { EmployeeComponent } from './employee/employee.component';
import { TodayService } from './today/today.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [TodayComponent, EmployeeComponent, AttendanceSheetComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [TodayService],
})
export class AttendanceModule {}
