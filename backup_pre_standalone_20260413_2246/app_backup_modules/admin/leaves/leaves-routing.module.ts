import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LeaveBalanceComponent } from "./leave-balance/leave-balance.component";
import { LeaveRequestsComponent } from "./leave-requests/leave-requests.component";
import { LeaveTypesComponent } from "./leave-types/leave-types.component";

const routes: Routes = [
  {
    path: "leave-requests",
    component: LeaveRequestsComponent,
  },
  {
    path: "leave-balance",
    component: LeaveBalanceComponent,
  },
  {
    path: "leave-types",
    component: LeaveTypesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavesRoutingModule {}
