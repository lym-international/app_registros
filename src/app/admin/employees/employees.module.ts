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

@NgModule({
  declarations: [
    AllemployeesComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [EmployeesService],
})
export class EmployeesModule {}
