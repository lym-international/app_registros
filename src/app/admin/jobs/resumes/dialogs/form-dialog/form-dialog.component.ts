import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ResumesService } from '../../resumes.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Resumes } from '../../resumes.model';

export interface DialogData {
  id: number;
  action: string;
  resumes: Resumes;
}

@Component({
  selector: 'app-form-dialog:not(g)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  resumesForm: UntypedFormGroup;
  resumes: Resumes;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public resumesService: ResumesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.resumes.name;
      this.resumes = data.resumes;
    } else {
      this.dialogTitle = 'New Resumes';
      const blankObject = {} as Resumes;
      this.resumes = new Resumes(blankObject);
    }
    this.resumesForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.status,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('status')
      ? 'Not a valid status'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.resumes.id],
      img: [this.resumes.img],
      name: [this.resumes.name],
      title: [this.resumes.title],
      status: [this.resumes.status],
      download: [this.resumes.download],
      role: [this.resumes.role],
      department: [this.resumes.department],
      jobType: [this.resumes.jobType],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.resumesService.addResumes(this.resumesForm.getRawValue());
  }
}
