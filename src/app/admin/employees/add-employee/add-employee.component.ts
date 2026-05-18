import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { MatButton } from '@angular/material/button';
@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.scss'],
    imports: [BreadcrumbComponent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatSelect, MatOption, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, FileUploadComponent, MatButton]
})
export class AddEmployeeComponent {
  docForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  constructor(private fb: UntypedFormBuilder) {
    this.docForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ['', [Validators.required]],
      education: [''],
      uploadImg: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.docForm.value);
  }
}
