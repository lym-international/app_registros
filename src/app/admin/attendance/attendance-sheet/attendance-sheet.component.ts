import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.scss'],
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
