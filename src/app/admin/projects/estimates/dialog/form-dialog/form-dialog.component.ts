import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EstimatesService } from '../../estimates.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Estimates } from '../../estimates.model';

export interface DialogData {
  id: number;
  action: string;
  estimates: Estimates;
}

@Component({
  selector: 'app-form-dialog:not(k)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  estimatesForm: UntypedFormGroup;
  estimates: Estimates;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public estimatesService: EstimatesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.estimates.cName;
      this.estimates = data.estimates;
    } else {
      this.dialogTitle = 'New Estimates';
      const blankObject = {} as Estimates;
      this.estimates = new Estimates(blankObject);
    }
    this.estimatesForm = this.createContactForm();
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
      id: [this.estimates.id],
      eNo: [this.estimates.eNo],
      cName: [this.estimates.cName],
      estDate: [this.estimates.estDate],
      expDate: [this.estimates.expDate],
      country: [this.estimates.country],
      amount: [this.estimates.amount],
      status: [this.estimates.status],
      details: [this.estimates.details],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.estimatesService.addEstimates(this.estimatesForm.getRawValue());
  }
}
