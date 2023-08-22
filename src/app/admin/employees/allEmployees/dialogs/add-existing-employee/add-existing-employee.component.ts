import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, ViewChild, ElementRef, HostListener} from '@angular/core';
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
  selector: 'app-add-existing-employee',
  templateUrl: './add-existing-employee.component.html',
  styleUrls: ['./add-existing-employee.component.scss']
})
export class AddExistingEmployeeComponent {
  action: string;
  dialogTitle: string;
  //employeesForm: UntypedFormGroup;
  employeesForm: FormGroup;
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
  searchHighKey: string = '';


  constructor(
    
    public dialogRef: MatDialogRef<AddExistingEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //private fb: UntypedFormBuilder,
    private fb: FormBuilder,
    
  ) {
    this.dialogTitle = 'Add existing emergency employee';

    this.employeesForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],

      // Otros campos del formulario si los tienes
    });
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

  //Búsqueda del empleado por el highKeyId
  @ViewChild('filter', { static: false }) filterInput!: ElementRef;
  // Captura el valor del input y lo guarda en searchHighKey
  captureInputValue() {
    this.searchHighKey = this.filterInput.nativeElement.value;
    console.log('Usuario escribió:', this.searchHighKey);
    fetch(`https://us-central1-highkeystaff.cloudfunctions.net/users/getEmployeeById/id?id=${this.searchHighKey}`) 
      .then((response) => response.json())
      .then((data) => {
        console.log('DATA: ',data)
        this.formData = data;
        // Asignar los valores al formulario
        this.employeesForm.patchValue({
          firstName: data.firstname,
          lastName: data.lastname,
          phone: data.phone,
          email: data.email,
          // Otros campos si los tienes
        });
      })
    }
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'End', 'Home'];
    
    // Verifica si la tecla presionada no es un número ni una tecla de control
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault(); // Previene la entrada de la tecla no deseada
    }
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
      //this.formData = this.employeesForm.value;
      
      const newPositionName = this.selectedPosition;

      // Verifica si el nombre de la posición ya existe en formData.positions
      const positionExists = this.formData.positions.some(position => position.name === newPositionName);
      
      if (!positionExists) {
        // Si la posición no existe, crea un nuevo objeto de posición y agrégalo al array
        const newPosition = {
          rate: 15, // Define el valor que corresponda a la tasa de la nueva posición
          name: newPositionName
        };
      
        this.formData.positions.push(newPosition);
      }
      
      // Asegúrate de que this.formData.position y this.formData.hourFrom estén actualizados según los valores del formulario
      //this.formData.position = this.selectedPosition;
      this.formData.hourFrom = this.selectedHour;
      
      // Puedes imprimir el array actualizado para verificarlo
      console.log('formData.positions:', this.formData.positions);
  
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
