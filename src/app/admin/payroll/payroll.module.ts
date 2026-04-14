import { NgModule } from '@angular/core';
import { EmployeeSalaryService } from './employee-salary/employee-salary.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PayrollRoutingModule } from './payroll-routing.module';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { PayslipComponent } from './payslip/payslip.component';
import { DeleteDialogComponent } from './employee-salary/dialogs/delete/delete.component';
import { FormDialogComponent } from './employee-salary/dialogs/form-dialog/form-dialog.component';

@NgModule({
    imports: [
    CommonModule,
    PayrollRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatProgressSpinnerModule,
    EmployeeSalaryComponent,
    PayslipComponent,
    DeleteDialogComponent,
    FormDialogComponent,
],
    providers: [EmployeeSalaryService],
})
export class PayrollModule {}

