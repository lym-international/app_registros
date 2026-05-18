import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
@Component({
    selector: 'app-attendance-sheet',
    templateUrl: './attendance-sheet.component.html',
    styleUrls: ['./attendance-sheet.component.scss'],
    imports: [BreadcrumbComponent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton]
})
export class AttendanceSheetComponent {
  attendanceForm: UntypedFormGroup;
  constructor() {
    this.attendanceForm = new UntypedFormGroup({
      fromDate: new UntypedFormControl(),
      toDate: new UntypedFormControl(),
    });
  }
}
