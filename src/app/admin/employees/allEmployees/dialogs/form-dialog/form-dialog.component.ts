import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EmployeesService } from '../../employees.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Employees } from '../../employees.model';
import { formatDate } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';


export interface DialogData {
  id: number;
  action: string;
  employees: Employees;
}

@Component({
  selector: 'app-form-dialog:not(c)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  employeesForm: UntypedFormGroup;
  employees: Employees;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phone: FormControl;
  formData: any;
  positions = [];
  //selectedPositions: any[] = [];
  selectedPosition: string | null = null;
  selectedHour: string | null = null;
  selectedRate : number | 0 = 0;
  selectedRow: any = null;
  selectedRows: { [key: string]: boolean } = {};
  isTableSelected = false;


  constructor(
    
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //private fb: UntypedFormBuilder,
    private fb: FormBuilder,
    
  ) {
    this.dialogTitle = 'New emergency employee';
  }

  ngOnInit(): void {
    this.firstName = new FormControl();
    this.lastName = new FormControl();
    this.email = new FormControl();
    this.phone = new FormControl();
    

    this.employeesForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      });
     
    //trae las posiciones desde el dashboard-lm
    const storedPositions = localStorage.getItem('positions');
    this.positions = storedPositions ? JSON.parse(storedPositions) : {};
    
    // console.log('this.positions en el Modal: ',this.positions)
    
  }

  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  isRowSelected(position: any, hour: any): boolean {
    return this.selectedRows[`${position.key}-${hour.key}`] === true;
  }

  handleCheckboxChange(event: any, position: any, hour: any) {
    const positionKey = position.key;
    const hourKey = hour.key;
    const rateValue = hour.value.rate;
  
    if (event.target.checked) {
      // Deseleccionar la fila previamente seleccionada si hay una
      if (this.selectedPosition !== null && this.selectedHour !== null) {
        this.selectedPosition = null;
        this.selectedHour = null;
        this.selectedRate = null
      }
  
      this.selectedPosition = positionKey;
      this.selectedHour = hourKey;
      this.selectedRate = rateValue;
    } else {
      // Si se desmarca la casilla, también deseleccionamos la fila
      this.selectedPosition = null;
      this.selectedHour = null;
    }
  
    this.updateIsTableSelected();
  }

 

  updateIsTableSelected() {
    this.isTableSelected = !!this.selectedPosition && !!this.selectedHour && !!this.selectedRate;
  }
 
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  public confirmAdd(): void {
    if (this.selectedPosition && this.selectedHour) {
      // Si hay una fila seleccionada, agrega la posición y la hora al objeto formData
      this.formData = this.employeesForm.value;
      this.formData.position = this.selectedPosition;
      this.formData.hourFrom = this.selectedHour;
      this.formData.rate = this.selectedRate;
      //  console.log('FormData en form-dialog: ', this.formData);
  
      this.dialogRef.close(this.formData);
    } else {
      // Si no hay fila seleccionada, muestra un mensaje de error o toma la acción apropiada
      // console.log('No se ha seleccionado ninguna fila');
    }
  }
  
}
