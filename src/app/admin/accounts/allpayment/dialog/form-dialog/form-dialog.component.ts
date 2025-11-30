import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PaymentService } from '../../payment.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Payment } from '../../payment.model';

export interface DialogData {
  id: number;
  action: string;
  payment: Payment;
}

@Component({
  selector: 'app-form-dialog:not(a)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  paymentForm: UntypedFormGroup;
  payment: Payment;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public paymentService: PaymentService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.payment.cName;
      this.payment = data.payment;
    } else {
      this.dialogTitle = 'New Payment';
      const blankObject = {} as Payment;
      this.payment = new Payment(blankObject);
    }
    this.paymentForm = this.createContactForm();
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
      id: [this.payment.id],
      cName: [this.payment.cName],
      eName: [this.payment.eName],
      charges: [this.payment.charges],
      date: [this.payment.date],
      tax: [this.payment.tax],
      discount: [this.payment.discount],
      total: [this.payment.total],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.paymentService.addPayment(this.paymentForm.getRawValue());
  }
}
