import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Employees } from '../../employees.model';
import { formatDate } from '@angular/common';
import { CheckoutValidatorService } from 'app/_services/checkout-validator.service';
//import { CheckOutModel } from './check-out.model';
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
  //checkOut: CheckOutModel;
  employees: Employees;
  //showDeleteBtn = false;
  fechaSalida: FormControl;
  showError = false; 
  private isValidationInProgress = false;
  
  ngOnInit(): void {
    this.checkOutForm.patchValue({
      endDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
    this.fechaSalida = new FormControl();//new Date()
    this.checkOutForm = new FormGroup({
    endDate: this.fechaSalida
  });

  this.checkOutForm.get('endDate').valueChanges.subscribe(() => {
    this.validateCheckOut();
  });
  //this.fechaSalida.valueChanges.subscribe(() => {
    //this.validateCheckOut();
  //});
  }

  constructor(
    public dialogRef: MatDialogRef<CheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //public calendarService: CalendarService,
    private fb: UntypedFormBuilder,
    private checkoutValidatorService: CheckoutValidatorService,
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      //this.dialogTitle = data.checkIn.title;
      //this.calendar = data.calendar;
      //this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'CheckOut date:';
      //const blankObject = {} as CheckOutModel;
      //this.checkOut = new CheckOutModel(blankObject);
      //this.showDeleteBtn = false;
    }
    this.checkOutForm = this.createContactForm();
    console.log('Hora CheckOut ==>',this.checkOutForm.controls)
    this.showError = false;
  }
  
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  validateCheckOut() {
    const checkOutDate = this.fechaSalida.value;
    this.checkoutValidatorService.setCheckOutDate(checkOutDate);
    console.log('Validación del servicio: ',this.checkoutValidatorService.validateDates())
    
    if (this.checkoutValidatorService.validateDates()) {
      //console.log('-------------')
      //console.log('ENTRO AL IF')
      // Habilita el botón "Save" si la validación es exitosa
      this.showError = false;
      //console.log('showError en el If= ',this.showError)
      //this.checkOutForm.get('endDate').enable();
    } else {
      //console.log('-------------')
      //console.log('ENTRO AL ELSE')
      this.showError = true;
      //console.log('showError en el Else= ',this.showError)
      //this.checkOutForm.get('endDate').disable();
    }
    console.log('Validación después del IF: ',this.checkoutValidatorService.validateDates())
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      //id: [this.checkOut.id],
      //title: [this.checkOut.title],
      //category: [this.checkOut.category],
      //startDate: [this.checkOut.startDate],
      //endDate: [this.checkOut.endDate, [Validators.required]],
      //details: [this.checkOut.details],  
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
    const endDate = this.fechaSalida.value;
    this.dialogRef.close(endDate);
    //this.checkoutValidatorService.setCheckoutDate(endDate);
  }



/*
  public confirmAdd(): void {
    const endDate = this.fechaSalida.value;
    this.checkoutValidatorService.setCheckoutDate(endDate);
  
    if (this.checkoutValidatorService.validateCheckoutDate()) {
      // La fecha del checkout es válida, puedes cerrar el modal de checkout
      this.dialogRef.close(endDate);
      this.showError = false; // Oculta el mensaje de error
    } else {
      
      // Muestra el mensaje de error
      this.showError = true;
    }
  }
  */
  /*
  public confirmAdd(): void {
    const endDate = this.fechaSalida.value;
    this.checkoutValidatorService.setCheckoutDate(endDate);

    if (this.checkoutValidatorService.validateCheckoutDate()) {
      // La fecha del checkout es válida, puedes cerrar el modal de checkout
      this.dialogRef.close(endDate);
    } else {
      // Muestra un mensaje de error
      alert("La fecha de checkout debe ser posterior a la fecha de checkin.");
    
    }
    */
    /*
    const endDate = this.fechaSalida.value;
    
    this.dialogRef.close(endDate);
    
  }
  */
}
