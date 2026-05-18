import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardLmComponent } from "./dashboard-lm.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardLmComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardLmRoutingModule {}