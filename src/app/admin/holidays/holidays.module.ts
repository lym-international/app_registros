import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayRoutingModule } from './holidays-routing.module';
import { AllHolidayComponent } from './all-holidays/all-holidays.component';
import { DeleteDialogComponent } from './all-holidays/dialog/delete/delete.component';
import { FormDialogComponent } from './all-holidays/dialog/form-dialog/form-dialog.component';
import { EditHolidayComponent } from './edit-holiday/edit-holiday.component';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { HolidayService } from './all-holidays/all-holidays.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    AllHolidayComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    EditHolidayComponent,
    AddHolidayComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HolidayRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [HolidayService],
})
export class HolidayModule {}
