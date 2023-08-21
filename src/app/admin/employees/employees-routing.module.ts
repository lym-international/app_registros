import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { AllemployeesComponent } from "./allEmployees/allemployees.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { EmployeeProfileComponent } from "./employee-profile/employee-profile.component";
import { AdminEmployeesComponent } from "./admin-employees/admin-employees.component";

const routes: Routes = [
  {
    path: "allEmployees",
    component: AllemployeesComponent,
  },
  {
    path: "admin-employees",
    component: AdminEmployeesComponent,
  },
  {
    path: "add-employee",
    component: AddEmployeeComponent,
  },
  {
    path: "edit-employee",
    component: EditEmployeeComponent,
  },
  {
    path: "employee-profile",
    component: EmployeeProfileComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
