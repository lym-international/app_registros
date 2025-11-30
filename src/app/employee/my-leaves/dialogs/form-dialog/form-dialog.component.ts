import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { MyLeaves } from '../../my-leaves.model';
import { MyLeavesService } from '../../my-leaves.service';

export interface DialogData {
  id: number;
  action: string;
  myLeaves: MyLeaves;
}

@Component({
  selector: 'app-form-dialog:not(o)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  myLeavesForm: UntypedFormGroup;
  myLeaves: MyLeaves;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public myLeavesService: MyLeavesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Leave Request';
      this.myLeaves = data.myLeaves;
    } else {
      this.dialogTitle = 'New Leave Request';
      const blankObject = {} as MyLeaves;
      this.myLeaves = new MyLeaves(blankObject);
    }
    this.myLeavesForm = this.createContactForm();
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
      id: [this.myLeaves.id],
      halfDay: [this.myLeaves.halfDay, [Validators.required]],
      applyDate: [this.myLeaves.applyDate, [Validators.required]],
      fromDate: [this.myLeaves.fromDate, [Validators.required]],
      toDate: [this.myLeaves.toDate, [Validators.required]],
      type: [this.myLeaves.type, [Validators.required]],
      status: [this.myLeaves.status, [Validators.required]],
      reason: [this.myLeaves.reason, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.myLeavesService.addMyLeaves(this.myLeavesForm.getRawValue());
  }
}
