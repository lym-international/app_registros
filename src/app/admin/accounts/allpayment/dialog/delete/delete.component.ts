import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PaymentService } from '../../payment.service';

export interface DialogData {
  id: number;
  cName: string;
  eName: string;
  total: string;
}

@Component({
  selector: 'app-delete:not(a)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public paymentService: PaymentService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.paymentService.deletePayment(this.data.id);
  }
}
