import { NgModule } from '@angular/core';
import { CalendarService } from './calendar.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarRoutingModule } from './calendar-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
//import {  OwlDateTimeModule,  OwlNativeDateTimeModule,} from '@danielmoncada/angular-datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarComponent } from './calendar.component';
import { FormDialogComponent as calFormComponent } from './dialogs/form-dialog/form-dialog.component';

import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    //OwlDateTimeModule,
    //OwlNativeDateTimeModule,
    ComponentsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [CalendarComponent, calFormComponent],
  providers: [CalendarService],
})
export class CalendarsModule {}

