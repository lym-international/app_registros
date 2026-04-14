import { NgModule } from '@angular/core';
import { LeavesService } from './leave-requests/leaves.service';
import { LeaveBalanceService } from './leave-balance/leave-balance.service';
import { LeaveTypesService } from './leave-types/leave-types.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';


import { LeavesRoutingModule } from './leaves-routing.module';
import { FormComponent as leavesForm } from './leave-requests/form/form.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { DeleteComponent } from './leave-requests/delete/delete.component';
import { LeaveBalanceComponent } from './leave-balance/leave-balance.component';
import { LeaveTypesComponent } from './leave-types/leave-types.component';



@NgModule({
    imports: [
    CommonModule,
    LeavesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    leavesForm,
    DeleteComponent,
    LeaveRequestsComponent,
    LeaveBalanceComponent,
    LeaveTypesComponent,
],
    providers: [LeavesService, LeaveBalanceService, LeaveTypesService],
})
export class LeavesModule {}

