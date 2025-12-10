import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { GeolocationService } from 'app/_services/geolocation.service';
import { ShareScheduledTimeService } from 'app/_services/share-scheduled-time.service';
import { ShareTimeDifferenceInMinutesService } from 'app/_services/share-time-difference-in-minutes.service';

export interface DialogData {
  id: number;
  action: string;
}

@Component({
  selector: 'app-check-in-admin-employees',
  templateUrl: './check-in-admin-employees.component.html',
  styleUrls: ['./check-in-admin-employees.component.scss']
})
export class CheckInAdminEmployeesComponent implements OnInit {
  action: string;
  dialogTitle: string;
  checkInForm: UntypedFormGroup;
  showDeleteBtn = false;
  fechaInicio: UntypedFormControl;
  inputDisabled = true;
  latitud: number;
  longitud: number;
  shareHourFromFormatted: string;
  dateStart: Date;
  actualTime: Date;
  schedule: any;

  constructor(
    public dialogRef: MatDialogRef<CheckInAdminEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private geolocationService: GeolocationService,
    private shareScheduledTimeService: ShareScheduledTimeService,
    private shareTimeDifferenceInMinutesService: ShareTimeDifferenceInMinutesService,
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'CheckIn date:';
      this.showDeleteBtn = false;
    }
    this.checkInForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.actualTime = new Date();

    this.checkInForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });

    this.dateStart = this.shareScheduledTimeService.getScheduleDate();
    const scheduleTime = new Date(this.dateStart);
    const timeDifferenceInMinutes = (scheduleTime.getTime() - this.actualTime.getTime()) / (1000 * 60);
    this.shareTimeDifferenceInMinutesService.setTimeDifference(timeDifferenceInMinutes);

    if (timeDifferenceInMinutes >= 20) {
      this.fechaInicio = new UntypedFormControl(scheduleTime);
      this.checkInForm = new FormGroup({
        startDate: this.fechaInicio
      });
    } else {
      this.fechaInicio = new UntypedFormControl(new Date());
      this.checkInForm = new FormGroup({
        startDate: this.fechaInicio
      });
    }

    this.shareScheduledTimeService.getScheduleDateObservable().subscribe((selectedDate) => {
      if (selectedDate) {
        console.log("selectedDate", selectedDate);
      }
    });

    // Suscríbete al observable de coordenadas
    this.geolocationService.getCoordinatesObservable().subscribe(
      (coordinates) => {
        this.latitud = coordinates.latitude;
        this.longitud = coordinates.longitude;
        console.log("Coordenadas recibidas: ", coordinates);
      },
      (error) => {
        console.error("Error obteniendo las coordenadas: ", error);
      }
    );
  }

  formControl = new UntypedFormControl('', [
    Validators.required,
  ]);

  checkInUpdated: EventEmitter<any> = new EventEmitter<any>();

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      // Agrega tus controles de formulario aquí
    });
  }

  submit() {
    // Implementa la funcionalidad de enviar aquí
  }

  deleteEvent() {
    // Implementa la funcionalidad de eliminar aquí
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
    }
    //this.checkoutValidatorService.setCheckoutDate(endDate);
  }

  public confirmAdd1(): void {
    const startDate = this.fechaInicio.value;
    this.schedule = {
      startDate: startDate,
      actualTime: this.actualTime
    }
    startDate.actualTime = this.actualTime;
    this.dialogRef.close(this.schedule);

    this.geolocationService.getCurrentLocation();
  }
}
