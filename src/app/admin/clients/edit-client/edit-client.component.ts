import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { MatButton } from '@angular/material/button';
@Component({
    selector: 'app-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['./edit-client.component.scss'],
    imports: [BreadcrumbComponent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatSelect, MatOption, FileUploadComponent, MatButton]
})
export class EditClientComponent {
  clientForm: UntypedFormGroup;
  formdata = {
    name: 'Pooja Sarma',
    mobile: '123456789',
    email: 'test@example.com',
    date: '1987-02-17T14:22:18Z',
    company_name: 'ABC Infotech',
    currency: 'rupee',
    billing_method: 'Fixed Price',
    uploadImg: '',
  };

  constructor(private fb: UntypedFormBuilder) {
    this.clientForm = this.createContactForm();
  }
  onSubmit() {
    console.log('Form Value', this.clientForm.value);
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      name: [this.formdata.name, [Validators.required]],
      mobile: [this.formdata.mobile, [Validators.required]],
      email: [
        this.formdata.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      date: [this.formdata.date, [Validators.required]],
      company_name: [this.formdata.company_name],
      currency: [this.formdata.currency],
      billing_method: [this.formdata.billing_method],
      uploadImg: [this.formdata.uploadImg],
    });
  }
}
