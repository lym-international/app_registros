import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
})
export class AddPaymentComponent {
  paymentForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {
    this.paymentForm = this.fb.group({
      bNo: ['', [Validators.required]],
      cName: ['', [Validators.required]],
      eName: ['', [Validators.required]],
      pDate: ['', [Validators.required]],
      dDate: ['', [Validators.required]],
      discount: [''],
      total: [''],
      pMethod: ['', [Validators.required]],
      pStatus: ['', [Validators.required]],
    });
  }
  onSubmit() {
    console.log('Form Value', this.paymentForm.value);
  }
}
