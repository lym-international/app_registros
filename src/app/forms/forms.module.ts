import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { EditorsComponent } from './editors/editors.component';
import { FormExamplesComponent } from './form-examples/form-examples.component';
import { FormValidationsComponent } from './form-validations/form-validations.component';
import { WizardComponent } from './wizard/wizard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { AdvanceControlsComponent } from './advance-controls/advance-controls.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
//import {  OwlDateTimeModule,  OwlNativeDateTimeModule,  OWL_DATE_TIME_LOCALE,} from '@danielmoncada/angular-datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ComponentsModule } from '../shared/components/components.module';


@NgModule({
    imports: [
    CommonModule,
    FormsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    //OwlDateTimeModule,
    //OwlNativeDateTimeModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ComponentsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EditorsComponent,
    FormExamplesComponent,
    FormValidationsComponent,
    WizardComponent,
    FormControlsComponent,
    AdvanceControlsComponent,
],
    providers: [provideNgxMask(),
        //{ provide: OWL_DATE_TIME_LOCALE, useValue: {hour12Timer: true} }]
        { provide: LOCALE_ID, useValue: 'en-US' }]
    /* providers: [
      // Configura OWL_DATE_TIME_LOCALE con 'en-US' y hour12Timer en true
      { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-US' },
      // { provide: OWL_DATE_TIME_FORMATS, useValue: {hour12Timer: true, ...} }, // Agrega esto para configurar hour12Timer
    ], */
})
export class FormModule {}
