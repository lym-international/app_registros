import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, EventEmitter, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
//import { CheckInModel } from './check-in.model';
import { formatDate } from '@angular/common';
import { CheckoutValidatorService } from 'app/_services/checkout-validator.service';
import { ShareStartDateService } from 'app/_services/share-start-date.service';
import { GeolocationService } from 'app/_services/geolocation.service';


export interface DialogData {
  id: number;
  action: string;
}

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  action: string;
  dialogTitle: string;
  checkInForm: UntypedFormGroup;
  fechaInicio: FormControl;
  roundedCheckIn: Date;
  localStorageCheckIn: any;
  dateStart: Date[];


  //private owlDateTime: OwlDateTime;
  //checkIn: CheckInModel;
  //showDeleteBtn = false;
  //public dataCheckIn!: any;
  
  ngOnInit(): void {
    this.checkInForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
    this.fechaInicio = new FormControl(); //new Date()
    this.checkInForm = new FormGroup({
    startDate: this.fechaInicio
    });
    //this.dataCheckIn = this.checkInService.setCheckIn();

    this.dateStart = this.shareStartDateService.getDateStartData()
    console.log('DATEStart desde Modal Checkin: ',this.dateStart)

    if (this.dateStart && this.dateStart.length > 0) {
      // Accede a la primera fecha en el arreglo (asumiendo que solo hay una)
      const firstDate = this.dateStart[0];
      
      // Establece la fecha en el FormControl fechaInicio
      this.fechaInicio.setValue(firstDate);
    }
    
  }

  constructor(
    public dialogRef: MatDialogRef<CheckInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private checkoutValidatorService: CheckoutValidatorService,
    private readonly el: ElementRef,
    private shareStartDateService: ShareStartDateService, 
    private geolocationService: GeolocationService,
  ) {
    // this.action = data.action;
    if (this.action === 'edit') {
      //this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'CheckIn date:';
      //const blankObject = {} as CheckInModel;
      //this.checkIn = new CheckInModel(blankObject);
      //this.showDeleteBtn = false;
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
  
  public async confirmAdd(): Promise<void> {
    const startDate = this.fechaInicio.value;
    try {
      const coordinates = await this.geolocationService.getCurrentLocationB();
      const result = { startDate, coordinates };
      this.dialogRef.close(result);
    } catch (error) {
      console.error("Error obteniendo las coordenadas: ", error);
      // Manejar el error si es necesario
      const result = { startDate, coordinates: null }; 
      this.dialogRef.close(result);

    }
    //this.checkoutValidatorService.setCheckoutDate(endDate);
  }

 
  
}
