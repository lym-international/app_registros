import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
//import { CalendarService } from '../../calendar.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Employees } from '../../employees.model';
import { CheckInModel } from './check-in.model';
import { formatDate } from '@angular/common';
import { Calendar } from 'app/calendar/calendar.model';
//import moment = require('moment');


export interface DialogData {
  id: number;
  action: string;
  //calendar: Calendar;
}


//Anterior:
/*import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EmployeesService } from '../../employees.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Employees } from '../../employees.model';
import { formatDate } from '@angular/common';
*/

//Anterior
/*export interface DialogData {
  id: number;
  action: string;
  employees: Employees;
}
*/

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})

export class CheckInComponent implements OnInit{

  action: string;
  dialogTitle: string;
  checkInForm: UntypedFormGroup;
  checkIn: CheckInModel;
  employees: Employees;
  showDeleteBtn = false;
  fechaInicio: FormControl;
  
  ngOnInit(): void {
    this.checkInForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
    this.fechaInicio = new FormControl(new Date());
    this.checkInForm = new FormGroup({
    startDate: this.fechaInicio
  });
  }

  constructor(
    public dialogRef: MatDialogRef<CheckInComponent>,
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
      this.dialogTitle = 'CheckIn date:';
      const blankObject = {} as CheckInModel;
      this.checkIn = new CheckInModel(blankObject);
      this.showDeleteBtn = false;
    }
    this.checkInForm = this.createContactForm();
    console.log('Hora CheckIn ==>',this.checkInForm.controls)
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
      id: [this.checkIn.id],
      title: [this.checkIn.title],
      category: [this.checkIn.category],
      startDate: [this.checkIn.startDate, [Validators.required]],
      endDate: [this.checkIn.endDate],
      details: [this.checkIn.details],  
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
    const startDate = this.fechaInicio.value;
    //const timestamp = moment(startDate).format('YYYY-MM-DDTHH:mm:ss');
    console.log('La fecha seleccionada es:', startDate); //, ' En timestamp:', timestamp
    this.dialogRef.close('submit');
  }
  
}

//Anterior:
/*
export class CheckInComponent {
  action: string;
  dialogTitle: string;
  employeesForm: UntypedFormGroup;
  employees: Employees;
  
  constructor(
    public dialogRef: MatDialogRef<CheckInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public employeesService: EmployeesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.employees.firstName;
      this.employees = data.employees;
    } else {
      this.dialogTitle = 'Check-in date:';
      const blankObject = {} as Employees;
      this.employees = new Employees(blankObject);
    }
    this.employeesForm = this.createContactForm();
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
      id: [this.employees.id],
      // img: [this.employees.img],
      highKeyID: [this.employees.highKeyId],
      position: [this.employees.position],
      in: [this.employees.highKeyId],
      firstName: [this.employees.firstName],
      lastName: [this.employees.lastName],
      
      // role: [this.employees.role],
      // mobile: [this.employees.mobile],
      // department: [this.employees.department],
      // degree: [this.employees.degree],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.employeesService.addEmployees(this.employeesForm.getRawValue());
  }
} 
*/