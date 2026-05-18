import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllHolidayComponent } from "./all-holidays/all-holidays.component";
import { AddHolidayComponent } from "./add-holiday/add-holiday.component";
import { EditHolidayComponent } from "./edit-holiday/edit-holiday.component";
import { Page404Component } from "../../authentication/page404/page404.component";
const routes: Routes = [
  {
    path: "all-holidays",
    component: AllHolidayComponent,
  },
  {
    path: "add-holiday",
    component: AddHolidayComponent,
  },
  {
    path: "edit-holiday",
    component: EditHolidayComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidayRoutingModule {}
