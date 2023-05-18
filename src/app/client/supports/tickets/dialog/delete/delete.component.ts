import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { TicketsService } from '../../tickets.service';

export interface DialogData {
  id: number;
  ticket_id: string;
  date: string;
  createdBy: string;
}

@Component({
  selector: 'app-delete:not(o)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ticketsService: TicketsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.ticketsService.deleteTicket(this.data.id);
  }
}
