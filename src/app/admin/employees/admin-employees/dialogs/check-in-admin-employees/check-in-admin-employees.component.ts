
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
import { ShareScheduledTimeService } from 'app/_services/share-schedule-time.service';

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
  shareHourFromFormatted: string;

  
  ngOnInit(): void {
    const actualTime = new Date();

    this.checkInForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
    
    this.shareScheduledTimeService.hourFormatted$.subscribe((formattedHour) => {
      this.shareHourFromFormatted = formattedHour;
      console.log("shareHourFromFormatted (scheduleTime) in checkInAdminEmployees: ", this.shareHourFromFormatted)
    
      // Convertir shareHourFromFormatted (scheduleTime) a un objeto de fecha
      const scheduleTime = new Date(formattedHour);
  
      // Calcular la diferencia en minutos
      const timeDifferenceInMinutes = (scheduleTime.getTime() - actualTime.getTime()) / (1000 * 60);
      console.log('Diferencia entre scheduleTime y la actualTime en mins: ',timeDifferenceInMinutes)

      if (timeDifferenceInMinutes >= 20) {
        console.log("La hora actual es menor o igual que el scheduleTime en 20 mins.");
        console.log("scheduleTime:", formattedHour);
        this.checkInForm.patchValue({ startDate: formattedHour });
      } else {
        console.log("La hora actual es mayor que el scheduleTime (comparando scheduleTime desde -20 mins).");
        console.log("Hora actual:", actualTime);
        console.log("Hora scheduleTime:", scheduleTime);
      }
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
    private geolocationService: GeolocationService,
    private shareScheduledTimeService : ShareScheduledTimeService
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
