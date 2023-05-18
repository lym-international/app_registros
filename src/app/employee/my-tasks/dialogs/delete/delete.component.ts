import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MyTasksService } from '../../my-tasks.service';

export interface DialogData {
  id: number;
  taskNo: string;
  status: string;
  project: string;
}

@Component({
  selector: 'app-delete:not(r)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public myTasksService: MyTasksService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.myTasksService.deleteMyTasks(this.data.id);
  }
}
