import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ClientsService } from '../../clients.service';

export interface DialogData {
  id: number;
  name: string;
  company_name: string;
  email: string;
}

@Component({
  selector: 'app-delete:not(b)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public clientService: ClientsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.clientService.deleteClient(this.data.id);
  }
}
