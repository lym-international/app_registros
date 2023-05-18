import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent {
  docForm: UntypedFormGroup;
  formdata = {
    first: 'Pooja',
    last: 'Sarma',
    gender: 'Female',
    mobile: '123456789',
    password: '123',
    conformPassword: '123',
    email: 'test@example.com',
    designation: 'Sr. Employee',
    department: '2',
    address: '101, Elanxa, New Yourk',
    dob: '1987-02-17T14:22:18Z',
    education: 'M.C.A.',
    uploadImg: '',
  };
  constructor(private fb: UntypedFormBuilder) {
    this.docForm = this.createContactForm();
  }
  onSubmit() {
    console.log('Form Value', this.docForm.value);
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      first: [
        this.formdata.first,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      last: [this.formdata.last],
      gender: [this.formdata.gender, [Validators.required]],
      mobile: [this.formdata.mobile, [Validators.required]],
      password: [this.formdata.password],
      conformPassword: [this.formdata.conformPassword],
      email: [
        this.formdata.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      designation: [this.formdata.designation],
      department: [this.formdata.department],
      address: [this.formdata.address],
      dob: [this.formdata.dob, [Validators.required]],
      education: [this.formdata.education],
      uploadImg: [this.formdata.uploadImg],
    });
  }
}
