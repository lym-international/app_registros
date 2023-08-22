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
  selectedRow: any = null;
  selectedRows: { [key: string]: boolean } = {};
  isTableSelected: boolean = false;


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
    
    console.log('this.positions en el Modal: ',this.positions)
    
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
    
    if (event.target.checked) {
      console.log('ENTRO AL IF');
      // Marca la fila seleccionada usando la clave compuesta de posición y hora
      //this.selectedRows[`${positionKey}-${hourKey}`] = true;
      this.selectedPosition = positionKey;
      this.selectedHour = hourKey;
      
    } else {
      console.log('ENTRO AL ELSE');
      // Desmarca la fila seleccionada
      //delete this.selectedRows[`${positionKey}-${hourKey}`];
      this.selectedPosition = null;
      this.selectedHour = null;
    }
    this.updateIsTableSelected();
  }

  updateIsTableSelected() {
    this.isTableSelected = !!this.selectedPosition && !!this.selectedHour;
  }
 //Este funciona bien
  /*handleCheckboxChange(event: any, row: any) {  
    
    if (event.target.checked) {
      console.log('ENTRO AL IF');
      // Marca la posición actualmente seleccionada
      this.selectedRow = row;
      console.log('this.selectedRow:',this.selectedRow)
      console.log('this.selectedRow.key:',this.selectedRow.key)
      console.log('this.selectedRow.value.hours:',this.selectedRow.value.hours)
    } else if (this.selectedRow === row) {
      console.log('ENTRO AL ELSE');
      // Desmarca la posición actualmente seleccionada
      this.selectedRow = null;
    }
  }
  */
    /*if (event.target.checked) {
      console.log('ENTRO AL IF')
      // Agrega la posición seleccionada al arreglo selectedPositions
      this.selectedPositions.push(position);
    } else {
      console.log('ENTRO AL ELSE')
      // Elimina la posición seleccionada del arreglo selectedPositions
      const index = this.selectedPositions.findIndex(p => p.key === position.key);
      if (index !== -1) {
        this.selectedPositions.splice(index, 1);
      }
    }*/
  

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
  
      console.log('FormData en form-dialog: ', this.formData);
  
      this.dialogRef.close(this.formData);
    } else {
      // Si no hay fila seleccionada, muestra un mensaje de error o toma la acción apropiada
      console.log('No se ha seleccionado ninguna fila');
    }
  }
  
  
  /*
  public confirmAdd(): void {
    
    if (Object.keys(this.selectedRows).length > 0) {
      // Si hay una fila seleccionada, agrega su posición al objeto formData
      // Puedes elegir la primera fila seleccionada si es relevante para tu lógica.
      const firstSelectedRowKey = Object.keys(this.selectedRows)[0];
      this.formData = this.employeesForm.value;
      this.formData.position = firstSelectedRowKey;

      console.log('FormData en form-dialog: ', this.formData);

      this.dialogRef.close(this.formData);
    } else {
      // Si no hay fila seleccionada, muestra un mensaje de error o toma la acción apropiada
      console.log('No se ha seleccionado ninguna fila');
    }
  }*/

  
}
