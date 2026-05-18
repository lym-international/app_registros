import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EmployeeSalaryService } from '../../employee-salary.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeSalary } from '../../employee-salary.model';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';

export interface DialogData {
  id: number;
  action: string;
  employeeSalary: EmployeeSalary;
}

@Component({
    selector: 'app-form-dialog:not(j)',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    imports: [MatIconButton, MatIcon, CdkScrollable, MatDialogContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSuffix, MatError, MatSelect, MatOption, MatButton, MatDialogClose]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  employeeSalaryForm: UntypedFormGroup;
  employeeSalary: EmployeeSalary;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public employeeSalaryService: EmployeeSalaryService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.employeeSalary.name;
      this.employeeSalary = data.employeeSalary;
    } else {
      this.dialogTitle = 'New EmployeeSalary';
      const blankObject = {} as EmployeeSalary;
      this.employeeSalary = new EmployeeSalary(blankObject);
    }
    this.employeeSalaryForm = this.createContactForm();
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
      id: [this.employeeSalary.id],
      img: [this.employeeSalary.img],
      name: [this.employeeSalary.name],
      email: [this.employeeSalary.email],
      payslip: [this.employeeSalary.payslip],
      role: [this.employeeSalary.role],
      empID: [this.employeeSalary.empID],
      department: [this.employeeSalary.department],
      salary: [this.employeeSalary.salary],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.employeeSalaryService.addEmployeeSalary(
      this.employeeSalaryForm.getRawValue()
    );
  }
}
