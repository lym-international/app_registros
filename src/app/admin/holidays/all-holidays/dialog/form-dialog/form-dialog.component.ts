import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HolidayService } from '../../all-holidays.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { AllHoliday } from '../../all-holidays.model';

export interface DialogData {
  id: number;
  action: string;
  holiday: AllHoliday;
}
@Component({
  selector: 'app-form-dialog:not(d)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  holidayForm: UntypedFormGroup;
  holiday: AllHoliday;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public holidayService: HolidayService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.holiday.hName;
      this.holiday = data.holiday;
    } else {
      this.dialogTitle = 'New Holiday';
      const blankObject = {} as AllHoliday;
      this.holiday = new AllHoliday(blankObject);
    }
    this.holidayForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.holiday.id],
      hName: [this.holiday.hName],
      date: [this.holiday.date],
      location: [this.holiday.location],
      shift: [this.holiday.shift],
      details: [this.holiday.details],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.holidayService.addHoliday(this.holidayForm.getRawValue());
  }
}
