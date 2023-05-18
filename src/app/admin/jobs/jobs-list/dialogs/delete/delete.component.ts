import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { JobsListService } from '../../jobs-list.service';

export interface DialogData {
  id: number;
  title: string;
  department: string;
  vacancies: string;
}

@Component({
  selector: 'app-delete:not(g)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public jobsListService: JobsListService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.jobsListService.deleteJobsList(this.data.id);
  }
}
