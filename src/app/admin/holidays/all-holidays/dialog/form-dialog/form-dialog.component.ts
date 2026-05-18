import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HolidayService } from '../../all-holidays.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllHoliday } from '../../all-holidays.model';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

export interface DialogData {
  id: number;
  action: string;
  holiday: AllHoliday;
}
@Component({
    selector: 'app-form-dialog:not(d)',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    imports: [MatIconButton, MatIcon, CdkScrollable, MatDialogContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSuffix, MatError, MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatButton, MatDialogClose]
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
