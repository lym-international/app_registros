import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
@Component({
    selector: 'app-form-examples',
    templateUrl: './form-examples.component.html',
    styleUrls: ['./form-examples.component.scss'],
    imports: [BreadcrumbComponent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatIcon, MatSuffix, MatError, MatSelect, MatOption, MatCheckbox, MatButton]
})
export class FormExamplesComponent {
  // Form 1
  register?: UntypedFormGroup;
  hide = true;
  // Form 2
  secondForm?: UntypedFormGroup;
  hide2 = true;
  // Form 3
  thirdForm?: UntypedFormGroup;
  hide3 = true;
  constructor(private fb: UntypedFormBuilder) {
    this.initForm();
    this.initSecondForm();
    this.initThirdForm();
  }
  initForm() {
    this.register = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      password: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      address: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      termcondition: [false, [Validators.requiredTrue]],
    });
  }
  initSecondForm() {
    this.secondForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      password: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      address: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      termcondition: [false, [Validators.requiredTrue]],
    });
  }
  initThirdForm() {
    this.thirdForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      password: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      address: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      termcondition: [false, [Validators.requiredTrue]],
    });
  }
  onRegister() {
    console.log('Form Value', this.register?.value);
  }
  onsecondFormSubmit() {
    console.log('Form Value', this.secondForm?.value);
  }
  onThirdFormSubmit() {
    console.log('Form Value', this.thirdForm?.value);
  }
}
