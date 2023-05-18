import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { JobsListService } from '../../jobs-list.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { JobsList } from '../../jobs-list.model';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  jobsList: JobsList;
}

@Component({
  selector: 'app-form-dialog:not(f)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  jobsListForm: UntypedFormGroup;
  jobsList: JobsList;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public jobsListService: JobsListService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.jobsList.title;
      this.jobsList = data.jobsList;
    } else {
      this.dialogTitle = 'New JobsList';
      const blankObject = {} as JobsList;
      this.jobsList = new JobsList(blankObject);
    }
    this.jobsListForm = this.createContactForm();
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
      id: [this.jobsList.id],
      title: [this.jobsList.title],
      status: [this.jobsList.status],
      date: [
        formatDate(this.jobsList.date, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      role: [this.jobsList.role],
      vacancies: [this.jobsList.vacancies],
      department: [this.jobsList.department],
      jobType: [this.jobsList.jobType],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.jobsListService.addJobsList(this.jobsListForm.getRawValue());
  }
}
