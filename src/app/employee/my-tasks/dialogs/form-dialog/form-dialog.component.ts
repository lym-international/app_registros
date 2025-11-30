import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { MyTasksService } from '../../my-tasks.service';
import { MyTasks } from '../../my-tasks.model';

export interface DialogData {
  id: number;
  action: string;
  myTasks: MyTasks;
}

@Component({
  selector: 'app-form-dialog:not(p)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  myTasksForm: UntypedFormGroup;
  myTasks: MyTasks;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public myTasksService: MyTasksService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.myTasks.taskNo;
      this.myTasks = data.myTasks;
    } else {
      this.dialogTitle = 'New MyTasks';
      const blankObject = {} as MyTasks;
      this.myTasks = new MyTasks(blankObject);
    }
    this.myTasksForm = this.createContactForm();
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
      id: [this.myTasks.id],
      taskNo: [this.myTasks.taskNo],
      project: [this.myTasks.project],
      client: [this.myTasks.client],
      status: [this.myTasks.status],
      priority: [this.myTasks.priority],
      type: [this.myTasks.type],
      executor: [this.myTasks.executor],
      date: [
        formatDate(this.myTasks.date, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      details: [this.myTasks.details],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.myTasksService.addMyTasks(this.myTasksForm.getRawValue());
  }
}
