import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ShortlistService } from '../../shortlist.service';

export interface DialogData {
  id: number;
  title: string;
  email: string;
  name: string;
}

@Component({
  selector: 'app-delete:not(i)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public shortlistService: ShortlistService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.shortlistService.deleteShortlist(this.data.id);
  }
}
