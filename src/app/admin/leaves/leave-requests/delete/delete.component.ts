import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LeavesService } from '../leaves.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';

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
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose, DatePipe]
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
