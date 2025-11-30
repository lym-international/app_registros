import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CandidatesService } from '../../candidates.service';

export interface DialogData {
  id: number;
  title: string;
  email: string;
  name: string;
}

@Component({
  selector: 'app-delete:not(f)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public candidatesService: CandidatesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.candidatesService.deleteCandidates(this.data.id);
  }
}
