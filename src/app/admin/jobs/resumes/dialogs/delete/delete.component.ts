import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ResumesService } from '../../resumes.service';

export interface DialogData {
  id: number;
  title: string;
  department: string;
  name: string;
}

@Component({
  selector: 'app-delete:not(h)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public resumesService: ResumesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.resumesService.deleteResumes(this.data.id);
  }
}
