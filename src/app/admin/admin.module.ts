import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { RoleChoiceModalComponent } from './role-choice-modal/role-choice-modal.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
 
  imports: [CommonModule, AdminRoutingModule,  MatDialogModule],
 
  declarations: [
       RoleChoiceModalComponent
 
  ],
})
export class AdminModule {}
