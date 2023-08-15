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
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Employees } from '../../employees.model';
//import { formatDate } from '@angular/common';
import { BreakModel } from './break.model';
import { MatButton } from '@angular/material/button';
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
export class BreakComponent implements OnInit{ 
  //action: string;
  dialogTitle: string;
  breakForm: UntypedFormGroup;
  break: BreakModel;
  employees: Employees;
  //showDeleteBtn = false;
  breakTime : FormControl;
  
  ngOnInit(): void {
    
    //this.breakTime = new FormControl(new Date());
    //this.breakForm = new FormGroup({
    //break: this.breakTime
  //});
  }

  constructor(
    public dialogRef: MatDialogRef<BreakComponent>,
    private fb: UntypedFormBuilder,
    
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
      //this.showDeleteBtn = false;
    //}
    this.breakForm = this.createContactForm();
    console.log('Break Time ==>',this.breakForm.controls)
    console.log('this.break.break: ', this.break.break)
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
      } 
      if (value < 20 || value > 120) {
        return { 'outOfRange': true };
      }
      return null;
    };
  }
  
  submit() {
    // empty stuff
  }

  deleteEvent() {
    this.dialogRef.close('delete');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    const _break = this.breakForm.value;
    //this._break = this.breakForm.get('break')?.value;
    console.log('El Break es:', _break);
    this.dialogRef.close(_break);
  }
}
