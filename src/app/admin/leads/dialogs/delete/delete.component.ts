import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LeadsService } from '../../leads.service';

export interface DialogData {
  id: number;
  mobile: string;
  department: string;
  name: string;
}

@Component({
  selector: 'app-delete:not(j)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public leadsService: LeadsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.leadsService.deleteLeads(this.data.id);
  }
}
