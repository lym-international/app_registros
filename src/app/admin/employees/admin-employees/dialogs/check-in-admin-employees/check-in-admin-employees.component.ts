
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
import { ShareScheduledTimeService } from 'app/_services/share-scheduled-time.service';

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
  dateStart:Date;
  actualTime:Date;
  schedule:any
  
  ngOnInit(): void {
     this.actualTime = new Date();

    this.checkInForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
    
    this.dateStart = this.shareScheduledTimeService.getScheduleDate();
    const scheduleTime = new Date(this.dateStart);
    console.log("scheduleTime", scheduleTime)
    console.log("actualTime", this.actualTime)
    const timeDifferenceInMinutes = (scheduleTime.getTime() - this.actualTime.getTime()) / (1000 * 60);
      console.log('Diferencia entre scheduleTime y la actualTime en mins: ',timeDifferenceInMinutes)
      if (timeDifferenceInMinutes >= 20) {
        console.log("La hora actual es menor o igual que el scheduleTime en 20 mins.");
        console.log("scheduleTime:", scheduleTime);
        // this.checkInForm.patchValue({ startDate: scheduleTime.getTime() });

      this.fechaInicio = new FormControl(scheduleTime);
      this.checkInForm = new FormGroup({
      startDate: this.fechaInicio
      });
        
      } else {
        console.log("La hora actual es mayor que el scheduleTime (comparando scheduleTime desde -20 mins).");
        console.log("Hora actual:",this.actualTime);
        this.fechaInicio = new FormControl(new Date());
        this.checkInForm = new FormGroup({
        startDate: this.fechaInicio
        });
      }


    this.shareScheduledTimeService.getScheduleDateObservable().subscribe((selectedDate) => {
      console.log('Activa el subscribe en  checkinEmployee')
      if (selectedDate) {
        console.log("selectedDate", selectedDate) 
      }
    });
  }

  constructor(
    public dialogRef: MatDialogRef<CheckInAdminEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private geolocationService: GeolocationService,
    private shareScheduledTimeService : ShareScheduledTimeService,
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
    this.schedule= {
      startDate: startDate,
      actualTime:this.actualTime
    }
    startDate.actualTime = this.actualTime
    console.log("schedule", this.schedule)
     this.dialogRef.close(this.schedule);
    
    this.geolocationService.getCurrentLocation();
  }
  
}
