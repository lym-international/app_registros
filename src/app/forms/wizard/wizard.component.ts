import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatStepper, MatStep, MatStepLabel, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    imports: [BreadcrumbComponent, MatStepper, MatStep, FormsModule, ReactiveFormsModule, MatStepLabel, MatFormField, MatLabel, MatInput, MatIcon, MatSuffix, MatButton, MatStepperNext, MatStepperPrevious]
})
export class WizardComponent implements OnInit {
  isLinear = false;
  HFormGroup1?: UntypedFormGroup;
  HFormGroup2?: UntypedFormGroup;
  VFormGroup1?: UntypedFormGroup;
  VFormGroup2?: UntypedFormGroup;
  constructor(private _formBuilder: UntypedFormBuilder) {}
  ngOnInit() {
    this.HFormGroup1 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.HFormGroup2 = this._formBuilder.group({
      address: ['', Validators.required],
    });

    this.VFormGroup1 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.VFormGroup2 = this._formBuilder.group({
      address: ['', Validators.required],
    });
  }
}
