import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EmployeesService } from '../../employees.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Employees } from '../../employees.model';
import { formatDate } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
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
  firstName: FormControl;
  lastName: FormControl;
  mail: FormControl;
  phone: FormControl;
  formData: any;
  
  ngOnInit(): void {
    this.firstName = new FormControl();
    this.lastName = new FormControl();
    this.mail = new FormControl();
    this.phone = new FormControl();
    this.employeesForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      mail: this.mail,
      phone: this.phone,
      });
  }

  constructor(
    
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //public employeesService: EmployeesService,
    private fb: UntypedFormBuilder
  ) {
    
    this.dialogTitle = 'New emergency employee';
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
  

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    
    this.formData = this.employeesForm.value;
    
    console.log('FormData en form-dialog: ', this.formData)
  
    this.dialogRef.close(this.formData);
    
  }
}
