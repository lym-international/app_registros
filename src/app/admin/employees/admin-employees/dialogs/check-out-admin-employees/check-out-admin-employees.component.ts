
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { CheckOutAdminEmployeesModel } from './check-out-admin-employees.model';
import { Employees } from 'app/admin/employees/allEmployees/employees.model';
import { GeolocationService } from 'app/_services/geolocation.service';
export interface DialogData {
  id: number;
  action: string;
  //calendar: Calendar;
}

@Component({
  selector: 'app-check-out-admin-employees',
  templateUrl: './check-out-admin-employees.component.html',
  styleUrls: ['./check-out-admin-employees.component.scss']
})
export class CheckOutAdminEmployeesComponent implements OnInit{
  action: string;
  dialogTitle: string;
  checkOutForm: UntypedFormGroup;
  checkOut: CheckOutAdminEmployeesModel;
  employees: Employees;
  showDeleteBtn = false;
  fechaSalida: FormControl;
  inputDisabled = true;
  
  ngOnInit(): void {
    this.checkOutForm.patchValue({
      endDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
    this.fechaSalida = new FormControl(new Date());
    this.checkOutForm = new FormGroup({
    endDate: this.fechaSalida
  });
  }

  constructor(
    public dialogRef: MatDialogRef<CheckOutAdminEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //public calendarService: CalendarService,
    private fb: UntypedFormBuilder,
    private geolocationService: GeolocationService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      //this.dialogTitle = data.checkIn.title;
      //this.calendar = data.calendar;
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'CheckOut date:';
      const blankObject = {} as CheckOutAdminEmployeesModel;
      this.checkOut = new CheckOutAdminEmployeesModel(blankObject);
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
      title: [this.checkOut.title],
      category: [this.checkOut.category],
      startDate: [this.checkOut.startDate],
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

  public async confirmAdd(): Promise<void> {
    const endDate = this.fechaSalida.value;
    try {
      const coordinates = await this.geolocationService.getCurrentLocationB();
      const result = { endDate, coordinates };
      this.dialogRef.close(result);
    } catch (error) {
      console.error("Error obteniendo las coordenadas: ", error);
      
      const result = { endDate, coordinates: null }; // Las coordenadas son nulas.
      this.dialogRef.close(result); // Cerrar el diálogo con la fecha y sin coordenadas.
      // Manejar el error si es necesario
    }
    //this.checkoutValidatorService.setCheckoutDate(endDate);
  }
  
  public confirmAdd1(): void {
    const endDate = this.fechaSalida.value;
    this.dialogRef.close(endDate);
    this.geolocationService.getCurrentLocation();
  }
}
