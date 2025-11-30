import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss'],
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
