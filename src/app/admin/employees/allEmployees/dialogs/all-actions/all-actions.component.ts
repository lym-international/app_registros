
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
//import { CheckInModel } from './check-in.model';

import { formatDate } from '@angular/common';
//import { AllActionsModel } from './all-actions.model';




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
  //checkIn: CheckInModel;
  //allActions: AllActionsModel;
  showDeleteBtn = false;
  fechaInicio: FormControl;
  fechaSalida: FormControl;
  public dataCheckIn!: any;
  
  ngOnInit(): void {
    this.allActionsForm.patchValue({
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      endDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
    this.fechaInicio = new FormControl(new Date());
    this.fechaSalida = new FormControl(new Date());
    this.allActionsForm = new FormGroup({
    startDate: this.fechaInicio,
    endDate: this.fechaSalida
    });
    //this.dataCheckIn = this.checkInService.setCheckIn();
    
  }

  /*constructor(private orderDataService: OrderDataService) {
    // controller code
  }
  ngOnInit() {
    this.dataOrder = this.orderDataService.getSelectedOrder(); */

  constructor(
    public dialogRef: MatDialogRef<AllActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      //this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'All Actions:';
      //const blankObject = {} as AllActionsModel;
      //this.allActions = new AllActionsModel(blankObject);
      //this.showDeleteBtn = false;
    }
    this.allActionsForm = this.createContactForm();
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
      //startDate: [this.allActions.date, [Validators.required]],
      //endDate: [this.allActions.date, [Validators.required]],
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
    const endDate = this.fechaSalida.value;
    
    const result = {
      startDate: startDate,
      endDate: endDate
  };

    // Cierra el diálogo y pasa el resultado
    this.dialogRef.close(result);
  }
  
}
