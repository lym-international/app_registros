import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
@Component({
    selector: 'app-add-payment',
    templateUrl: './add-payment.component.html',
    styleUrls: ['./add-payment.component.scss'],
    imports: [BreadcrumbComponent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatSelect, MatOption, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton]
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
