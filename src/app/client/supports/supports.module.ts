import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportsRoutingModule } from './supports-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { DeleteDialogComponent } from './tickets/dialog/delete/delete.component';
import { FormDialogComponent } from './tickets/dialog/form-dialog/form-dialog.component';
import { TicketsService } from './tickets/tickets.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    TicketsComponent,
    TicketDetailsComponent,
    DeleteDialogComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SupportsRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [TicketsService],
})
export class SupportsModule {}
