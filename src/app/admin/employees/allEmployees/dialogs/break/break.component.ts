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
  dialogTitle: string;
  breakForm: UntypedFormGroup;
  break: BreakModel;
  employees: Employees;
  
  ngOnInit(): void {
    
  }

  constructor(
    public dialogRef: MatDialogRef<BreakComponent>,
    private fb: UntypedFormBuilder,
    
  ) {
    this.dialogTitle = 'Break time:';
    const blankObject = {} as BreakModel;
    this.break = new BreakModel(blankObject);
    this.breakForm = this.createContactForm();
    //console.log('Break Time ==>',this.breakForm.controls)
    //console.log('this.break.break: ', this.break.break)
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
      } 
      if (value < 15 || value > 120) {
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
    console.log('El Break es:', _break);
    this.dialogRef.close(_break);
  }
}
