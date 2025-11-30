import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {
  clientForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  constructor(private fb: UntypedFormBuilder) {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      date: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      billing_method: ['', [Validators.required]],
      uploadImg: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.clientForm.value);
  }
}
