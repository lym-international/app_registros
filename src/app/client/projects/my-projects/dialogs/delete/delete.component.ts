import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MyProjectsService } from '../../my-projects.service';

export interface DialogData {
  id: number;
  pName: string;
  open_task: string;
  status: string;
}

@Component({
  selector: 'app-delete:not(n)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public myProjectsService: MyProjectsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.myProjectsService.deleteMyProjects(this.data.id);
  }
}
