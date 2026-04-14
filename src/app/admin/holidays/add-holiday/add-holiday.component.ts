import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
@Component({
    selector: 'app-add-holiday',
    templateUrl: './add-holiday.component.html',
    styleUrls: ['./add-holiday.component.scss'],
    imports: [BreadcrumbComponent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton]
})
export class AddHolidayComponent {
  holidayForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {
    this.holidayForm = this.fb.group({
      hNo: ['', [Validators.required]],
      hName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      location: ['', [Validators.required]],
      shift: ['', [Validators.required]],
      details: ['', [Validators.required]],
    });
  }
  onSubmit() {
    console.log('Form Value', this.holidayForm.value);
  }
}
