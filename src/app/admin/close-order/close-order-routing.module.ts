import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CloseOrderComponent } from "./close-order.component";


const routes: Routes = [
  {
    path: "",
    component: CloseOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseOrderRoutingModule {}