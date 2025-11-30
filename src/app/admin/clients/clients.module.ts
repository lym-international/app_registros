import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ClientsService } from './all-clients/clients.service';
import { FormDialogComponent } from './all-clients/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-clients/dialog/delete/delete.component';
import { ClientRoutingModule } from './clients-routing.module';
import { AllclientComponent } from './all-clients/all-clients.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    AllclientComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddClientComponent,
    EditClientComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [ClientsService],
})
export class ClientModule {}
