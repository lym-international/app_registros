import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EmployeesService } from '../../employees.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Employees } from '../../employees.model';
import { formatDate } from '@angular/common';
export interface DialogData {
  id: number;
  action: string;
  employees: Employees;
}
@Component({
  selector: 'app-form-dialog:not(c)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  employeesForm: UntypedFormGroup;
  employees: Employees;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public employeesService: EmployeesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.employees.name;
      this.employees = data.employees;
    } else {
      this.dialogTitle = 'New Employees';
      const blankObject = {} as Employees;
      this.employees = new Employees(blankObject);
    }
    this.employeesForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.employees.id],
      img: [this.employees.img],
      name: [this.employees.name],
      email: [this.employees.email],
      date: [
        formatDate(this.employees.date, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      role: [this.employees.role],
      mobile: [this.employees.mobile],
      department: [this.employees.department],
      degree: [this.employees.degree],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.employeesService.addEmployees(this.employeesForm.getRawValue());
  }
}
