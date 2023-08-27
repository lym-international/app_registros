import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
//import { CloseOrderComponent } from './close-order/close-order.component';


@NgModule({
  declarations: [
    //CloseOrderComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
