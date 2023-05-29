import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchOrderComponent } from "./search-order.component";

const routes: Routes = [
  {
    path: "",
    component: SearchOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchOrderRoutingModule {}