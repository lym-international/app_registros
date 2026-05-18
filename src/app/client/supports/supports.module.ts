import { NgModule } from '@angular/core';
import { TicketsService } from './tickets/tickets.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportsRoutingModule } from './supports-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { DeleteDialogComponent } from './tickets/dialog/delete/delete.component';
import { FormDialogComponent } from './tickets/dialog/form-dialog/form-dialog.component';
import { ComponentsModule } from '@shared/components/components.module';


@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SupportsRoutingModule,
    ComponentsModule,
    TicketsComponent,
    TicketDetailsComponent,
    DeleteDialogComponent,
    FormDialogComponent,
],
    providers: [TicketsService],
})
export class SupportsModule {}

