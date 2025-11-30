import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LeavesService } from '../leaves.service';

export interface DialogData {
  id: number;
  from: string;
  type: string;
  name: string;
}

@Component({
  selector: 'app-delete:not(k)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public leavesService: LeavesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.leavesService.deleteLeaves(this.data.id);
  }
}
