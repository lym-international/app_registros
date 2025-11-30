import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EmployeeSalaryService } from '../../employee-salary.service';

export interface DialogData {
  id: number;
  name: string;
  department: string;
  empID: string;
}

@Component({
  selector: 'app-delete:not(l)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public employeeSalaryService: EmployeeSalaryService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.employeeSalaryService.deleteEmployeeSalary(this.data.id);
  }
}
