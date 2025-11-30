import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LeaveReportComponent } from "./leave-report/leave-report.component";
import { ExpenseReportComponent } from "./expense/expense-report.component";

const routes: Routes = [
  {
    path: "leave-report",
    component: LeaveReportComponent,
  },
  {
    path: "expense-report",
    component: ExpenseReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
