
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, OnInit, Input } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
//import { CheckInModel } from './check-in.model';

import { formatDate } from '@angular/common';
//import { BreakModel } from './break.model';
//import { AllActionsModel } from './all-actions.model';
import { ShareStartDateService } from '../../../../../_services/share-start-date.service';
import { GeolocationService } from 'app/_services/geolocation.service';

export interface DialogData {
  id: number;
  action: string;
}

@Component({
  selector: 'app-all-actions',
  templateUrl: './all-actions.component.html',
  styleUrls: ['./all-actions.component.scss']
})
export class AllActionsComponent implements OnInit{

  action: string;
  dialogTitle: string;
  allActionsForm: UntypedFormGroup;
  showDeleteBtn = false;
  fechaInicio: FormControl;
  fechaSalida: FormControl;
  breakTime : FormControl;
  dateStart: Date[];
  
  

  ngOnInit(): void {
  
    this.allActionsForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      endDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
    //this.fechaInicio = new FormControl(this.dateStart || formatDate(new Date(), 'yyyy-MM-dd', 'en'));//this.fechaInicio = new FormControl(new Date());
    this.fechaInicio = new FormControl();//this.fechaInicio = new FormControl(new Date());
    this.fechaSalida = new FormControl();//this.fechaSalida = new FormControl(new Date());
    this.breakTime = new FormControl('0');
    this.allActionsForm = new FormGroup({
    startDate: this.fechaInicio,
    endDate: this.fechaSalida,
    break: this.breakTime
    },
    { validators: this.dateValidator }
    );
    this.dateStart = this.shareStartDateService.getDateStartData()
    //console.log('DATEStart desde allActions: ',this.dateStart)

    if (this.dateStart && this.dateStart.length > 0) {
      // Accede a la primera fecha en el arreglo (asumiendo que solo hay una)
      const firstDate = this.dateStart[0];
      
      // Establece la fecha en el FormControl fechaInicio
      this.fechaInicio.setValue(firstDate);
      this.fechaSalida.setValue(firstDate);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<AllActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private shareStartDateService: ShareStartDateService,
    private geolocationService: GeolocationService,
  ) {
    
      this.dialogTitle = 'All Actions:';
      
    this.allActionsForm = this.createContactForm();
    //console.log('Propiedades modalCheckIn ==>',this.checkInForm.controls)
  }
  
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  // Paso 2: Crear el EventEmitter
  checkInUpdated: EventEmitter<any> = new EventEmitter<any>(); //

  
  // Custom validator function to check if endDate is greater than startDate
  
  dateValidator: ValidatorFn = (formGroup: FormGroup): { [key: string]: any } | null => {
    const startDate = formGroup.get('startDate').value;
    const endDate = formGroup.get('endDate').value;
    //console.log('startDate en all actions: ',startDate)
    //console.log('endDate  en all actions: ',endDate)
  
    // Redondear las fechas a la unidad de minutos
    const roundedStartDate = new Date(startDate);
    const roundedEndDate = new Date(endDate);
  
    roundedStartDate.setSeconds(0);
    roundedEndDate.setSeconds(0);
  
    if (roundedStartDate > roundedEndDate || roundedStartDate.getTime() === roundedEndDate.getTime()) {
      formGroup.get('endDate').setErrors({ 'customError': true }); // Set custom error
      return { 'invalidDate': true };
    } else {
      formGroup.get('endDate').setErrors(null); // Clear custom error
    }
  
    return null;
  };
  
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
      //break: [this.break.break, [Validators.required, Validators.pattern(/^[0-9]*$/), this.numberValidator()]],
      //id: [this.checkIn.id],
      //title: [this.checkIn.title],
      //category: [this.checkIn.category],
      //startDate: [this.allActions.date, [Validators.required]],
      //endDate: [this.allActions.date, [Validators.required]],
      //details: [this.checkIn.details],
    });
  }
  
  //validación del rango del break
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
    // This method is not implemented yet, you can add the desired functionality here.
  }

  deleteEvent() {
    // This method is not implemented yet, you can add the desired functionality here.
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async confirmAdd(): Promise<void> {
    // const endDate = this.fechaSalida.value;
    const startDate = this.fechaInicio.value;
    const endDate = this.fechaSalida.value;
    const _break = this.allActionsForm.value.break;
    try {
      const coordinates = await this.geolocationService.getCurrentLocationB();
      // const result = { endDate, coordinates };
      const result = {
        startDate: startDate,
        endDate: endDate,
        break: _break,
        coordinates,
      };
      this.dialogRef.close(result);
    } catch (error) {
      console.error("Error obteniendo las coordenadas: ", error);
      // Manejar el error si es necesario
    }
    //this.checkoutValidatorService.setCheckoutDate(endDate);
  }

  public confirmAdd1(): void {
    const startDate = this.fechaInicio.value;
    const endDate = this.fechaSalida.value;
    const _break = this.allActionsForm.value.break;//this.breakForm.value;
    const result = {
      startDate: startDate,
      endDate: endDate,
      break: _break
    };
    this.geolocationService.getCurrentLocation();
    this.dialogRef.close(result);
  }
  
}
