import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
//import { CalendarService } from '../../calendar.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Employees } from '../../employees.model';
import { formatDate } from '@angular/common';
import { CheckOutModel } from './check-out.model';
//import { Calendar } from '../../calendar.model';

export interface DialogData {
  id: number;
  action: string;
  //calendar: Calendar;
}

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit{
  action: string;
  dialogTitle: string;
  checkOutForm: UntypedFormGroup;
  checkOut: CheckOutModel;
  employees: Employees;
  showDeleteBtn = false;
  
  ngOnInit(): void {
    this.checkOutForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
  }

  constructor(
    public dialogRef: MatDialogRef<CheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //public calendarService: CalendarService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      //this.dialogTitle = data.checkIn.title;
      //this.calendar = data.calendar;
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'CheckOut date:';
      const blankObject = {} as CheckOutModel;
      this.checkOut = new CheckOutModel(blankObject);
      this.showDeleteBtn = false;
    }
    this.checkOutForm = this.createContactForm();
    console.log('Hora CheckOut ==>',this.checkOutForm.controls)
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
      id: [this.checkOut.id],
      title: [this.checkOut.title, [Validators.required]],
      category: [this.checkOut.category],
      startDate: [this.checkOut.startDate, [Validators.required]],
      endDate: [this.checkOut.endDate, [Validators.required]],
      details: [this.checkOut.details],  
    });
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
