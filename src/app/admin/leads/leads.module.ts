import { NgModule } from '@angular/core';
import { LeadsService } from './leads.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';


import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsComponent } from './leads.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';

@NgModule({
    imports: [
    CommonModule,
    LeadsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    LeadsComponent, DeleteDialogComponent, FormDialogComponent,
],
    providers: [LeadsService],
})
export class LeadsModule {}

