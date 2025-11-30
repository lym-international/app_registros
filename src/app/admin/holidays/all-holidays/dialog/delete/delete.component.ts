import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HolidayService } from '../../all-holidays.service';

export interface DialogData {
  id: number;
  hName: string;
  location: string;
  date: string;
}

@Component({
  selector: 'app-delete:not(d)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public holidayService: HolidayService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.holidayService.deleteHoliday(this.data.id);
  }
}
