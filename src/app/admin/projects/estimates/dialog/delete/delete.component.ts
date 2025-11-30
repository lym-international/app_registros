import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EstimatesService } from '../../estimates.service';

export interface DialogData {
  id: number;
  eNo: string;
  cName: string;
  status: string;
}

@Component({
  selector: 'app-delete:not(m)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public estimatesService: EstimatesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.estimatesService.deleteEstimates(this.data.id);
  }
}
