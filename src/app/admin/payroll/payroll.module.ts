import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { PayrollRoutingModule } from './payroll-routing.module';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { PayslipComponent } from './payslip/payslip.component';
import { DeleteDialogComponent } from './employee-salary/dialogs/delete/delete.component';
import { FormDialogComponent } from './employee-salary/dialogs/form-dialog/form-dialog.component';
import { EmployeeSalaryService } from './employee-salary/employee-salary.service';

@NgModule({
  declarations: [
    EmployeeSalaryComponent,
    PayslipComponent,
    DeleteDialogComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    MatProgressSpinnerModule,
  ],
  providers: [EmployeeSalaryService],
})
export class PayrollModule {}
