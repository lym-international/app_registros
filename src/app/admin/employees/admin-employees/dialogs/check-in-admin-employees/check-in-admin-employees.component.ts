
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
//import { CheckInAdminEmployeesModel } from './check-in-admin-employees.model';
import { formatDate } from '@angular/common';
import { GeolocationService } from 'app/_services/geolocation.service';

export interface DialogData {
  id: number;
  action: string;
}

@Component({
  selector: 'app-check-in-admin-employees',
  templateUrl: './check-in-admin-employees.component.html',
  styleUrls: ['./check-in-admin-employees.component.scss']
})
export class CheckInAdminEmployeesComponent implements OnInit{
  action: string;
  dialogTitle: string;
  checkInForm: UntypedFormGroup;
  //checkIn: CheckInAdminEmployeesModel;
  showDeleteBtn = false;
  fechaInicio: FormControl;
  public dataCheckIn!: any;
  inputDisabled = true;
  latitud: number;
  longitud: number;
  
  ngOnInit(): void {
    this.checkInForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
    this.fechaInicio = new FormControl(new Date());
    this.checkInForm = new FormGroup({
    startDate: this.fechaInicio
    });
    //this.dataCheckIn = this.checkInService.setCheckIn();
    
  }

  /*constructor(private orderDataService: OrderDataService) {
    // controller code
  }
  ngOnInit() {
    this.dataOrder = this.orderDataService.getSelectedOrder(); */

  constructor(
    public dialogRef: MatDialogRef<CheckInAdminEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private geolocationService: GeolocationService
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'CheckIn date:';
      //const blankObject = {} as CheckInAdminEmployeesModel;
      //this.checkIn = new CheckInAdminEmployeesModel(blankObject);
      this.showDeleteBtn = false;
    }
    this.checkInForm = this.createContactForm();
    //console.log('Propiedades modalCheckIn ==>',this.checkInForm.controls)
  }
  
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  // Paso 2: Crear el EventEmitter
  checkInUpdated: EventEmitter<any> = new EventEmitter<any>(); //

  
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  // ... (Other methods in the component)

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      //id: [this.checkIn.id],
      //title: [this.checkIn.title],
      //category: [this.checkIn.category],
      //startDate: [this.checkIn.startDate, [Validators.required]],
      //endDate: [this.checkIn.endDate],
      //details: [this.checkIn.details],
    });
  }

  submit() {
    // This method is not implemented yet, you can add the desired functionality here.
  }

  deleteEvent() {
    // This method is not implemented yet, you can add the desired functionality here.
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const startDate = this.fechaInicio.value;
    this.dialogRef.close(startDate);
    
    this.geolocationService.getCurrentLocation();
  }
  
}
