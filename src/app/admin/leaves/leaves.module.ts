import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeavesRoutingModule } from './leaves-routing.module';
import { FormComponent as leavesForm } from './leave-requests/form/form.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { LeavesService } from './leave-requests/leaves.service';
import { DeleteComponent } from './leave-requests/delete/delete.component';
import { LeaveBalanceComponent } from './leave-balance/leave-balance.component';
import { LeaveBalanceService } from './leave-balance/leave-balance.service';
import { LeaveTypesComponent } from './leave-types/leave-types.component';
import { LeaveTypesService } from './leave-types/leave-types.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    leavesForm,
    DeleteComponent,
    LeaveRequestsComponent,
    LeaveBalanceComponent,
    LeaveTypesComponent,
  ],
  imports: [
    CommonModule,
    LeavesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [LeavesService, LeaveBalanceService, LeaveTypesService],
})
export class LeavesModule {}
