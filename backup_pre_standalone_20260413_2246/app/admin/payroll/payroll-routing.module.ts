import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeSalaryComponent } from "./employee-salary/employee-salary.component";
import { PayslipComponent } from "./payslip/payslip.component";

const routes: Routes = [
  {
    path: "employee-salary",
    component: EmployeeSalaryComponent,
  },
  {
    path: "payslip",
    component: PayslipComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollRoutingModule {}
