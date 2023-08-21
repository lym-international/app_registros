import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesRoutingModule } from './employees-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AllemployeesComponent } from './allEmployees/allemployees.component';
import { DeleteDialogComponent } from './allEmployees/dialogs/delete/delete.component';
import { FormDialogComponent } from './allEmployees/dialogs/form-dialog/form-dialog.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeesService } from './allEmployees/employees.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { DatePipe } from '@angular/common';
import { CheckInComponent } from './allEmployees/dialogs/check-in/check-in.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { CheckOutComponent } from './allEmployees/dialogs/check-out/check-out.component';
import { BreakComponent } from './allEmployees/dialogs/break/break.component';
import { AdminEmployeesComponent } from './admin-employees/admin-employees.component';
import { CheckInAdminEmployeesComponent } from './admin-employees/dialogs/check-in-admin-employees/check-in-admin-employees.component';
import { CheckOutAdminEmployeesComponent } from './admin-employees/dialogs/check-out-admin-employees/check-out-admin-employees.component';
import { BreakAdminEmployeesComponent } from './admin-employees/dialogs/break-admin-employees/break-admin-employees.component';
import { AllActionsComponent } from './allEmployees/dialogs/all-actions/all-actions.component';
import { AddExistingEmployeeComponent } from './allEmployees/dialogs/add-existing-employee/add-existing-employee.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    AllemployeesComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeProfileComponent,
    CheckInComponent,
    CheckOutComponent,
    BreakComponent,
    AdminEmployeesComponent,
    CheckInAdminEmployeesComponent,
    CheckOutAdminEmployeesComponent,
    BreakAdminEmployeesComponent,
    AllActionsComponent,
    AddExistingEmployeeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    ComponentsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgScrollbarModule
  ],
  providers: [EmployeesService, DatePipe],
})
export class EmployeesModule {}