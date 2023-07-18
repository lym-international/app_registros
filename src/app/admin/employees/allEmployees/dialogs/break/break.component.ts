import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
//import { CalendarService } from '../../calendar.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  AsyncValidatorFn,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Employees } from '../../employees.model';
//import { formatDate } from '@angular/common';
import { BreakModel } from './break.model';
//import { Calendar } from '../../calendar.model';

/*export interface DialogData {
  id: number;
  action: string;
  //calendar: Calendar;
}*/
@Component({
  selector: 'app-break',
  templateUrl: './break.component.html',
  styleUrls: ['./break.component.scss']
})
export class BreakComponent { //implements OnInit
  //action: string;
  dialogTitle: string;
  breakForm: UntypedFormGroup;
  break: BreakModel;
  employees: Employees;
  showDeleteBtn = false;
  
  /*ngOnInit(): void {
    this.checkInForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
  }*/

  constructor(
    public dialogRef: MatDialogRef<BreakComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
    //public calendarService: CalendarService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    //this.action = data.action;
    /*if (this.action === 'edit') {
      //this.dialogTitle = data.checkIn.title;
      //this.calendar = data.calendar;
      this.showDeleteBtn = true;
    } else { */
      this.dialogTitle = 'Break time:';
      const blankObject = {} as BreakModel;
      this.break = new BreakModel(blankObject);
      this.showDeleteBtn = false;
    //}
    this.breakForm = this.createContactForm();
    console.log('Break Time ==>',this.breakForm.controls)
    
  }
  
  /*formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]); 

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  } */

  getErrorMessage() {
    return this.breakForm.get('break')?.hasError('required')
      ? 'Break is required! '
      : this.breakForm.get('break')?.hasError('pattern')
      ? 'Please type only numbers!'
      : '';
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      //id: [this.break.id],
      break: [this.break.break, [Validators.required, Validators.pattern(/^[0-9]*$/), this.numberValidator()]],
      //title: [this.checkIn.title],
      //category: [this.checkIn.category],
      //startDate: [this.checkIn.startDate, [Validators.required]],
      //endDate: [this.checkIn.endDate],
      //details: [this.checkIn.details],  
    });
  }
  
  numberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (isNaN(value) || value === null || value === '') {
        return { 'invalidNumber': true };
      } else {
        return null;
      }
    };
  }
  
  submit() {
    // emppty stuff
  }
  deleteEvent() {
    //this.calendarService.deleteCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('delete');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    //this.calendarService.addUpdateCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('submit');
  }
}
