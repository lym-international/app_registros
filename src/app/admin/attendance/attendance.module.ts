import { NgModule } from '@angular/core';
import { TodayService } from './today/today.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { TodayComponent } from './today/today.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { ComponentsModule } from '@shared/components/components.module';


@NgModule({
    imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    ComponentsModule,
    TodayComponent, EmployeeComponent, AttendanceSheetComponent,
],
    providers: [TodayService],
})
export class AttendanceModule {}

