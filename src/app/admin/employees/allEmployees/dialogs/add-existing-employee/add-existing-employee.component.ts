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
  selectedRate : number | 0 = 0;
  selectedRows: { [key: string]: boolean } = {};
  isTableSelected = false;
  searchHighKey = '';
  selectedRowIndex = -1;

  
  @ViewChild('highKeyIdInput') highKeyIdInput;
  @ViewChild('payrollInput') payrollInput;
  @ViewChild('firstNameInput') firstNameInput;
  @ViewChild('lastNameInput') lastNameInput;

  constructor(
    
    public dialogRef: MatDialogRef<AddExistingEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //private fb: UntypedFormBuilder,
    private fb: FormBuilder,
    
  ) {
    this.dialogTitle = 'Add existing emergency employee';

    this.employeesForm = this.fb.group({
      //firstName: ['', Validators.required],
      //lastName: ['', Validators.required],
      // phone: ['', Validators.required],
      // email: ['', Validators.required],
      //phone: [''],
      //email: [''],
      // Otros campos del formulario si los tienes
      selected: false,
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
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

  //Búsqueda del empleado por el highKeyId
  @ViewChild('filter', { static: false }) filterInput!: ElementRef;
  // Captura el valor del input y lo guarda en searchHighKey

  formatTimeTo12HourFormat(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
  }
  formatHourForDisplay(key: any): string {
    if (typeof key === 'string') {
      return this.formatTimeTo12HourFormat(key);
    }
    // Si el tipo no es una cadena, puedes manejarlo de manera adecuada, por ejemplo, devolver un valor predeterminado.
    return 'N/A';
  }
  searchBy() {
    console.log('searchByHighkeyId() se está ejecutando');
  
    const inputValues = {
      highKeyId: this.highKeyIdInput.nativeElement.value,
      payroll: this.payrollInput.nativeElement.value,
      firstName: this.firstNameInput.nativeElement.value,
      lastName: this.lastNameInput.nativeElement.value,
    };
  
    const searchType = Object.keys(inputValues).find((key) => inputValues[key]);
    
    if (!searchType) {
      console.log('No se proporcionaron valores de búsqueda');
      this.clearFormData();
      return;
    }
  
    const endpointMap = {
      highKeyId:
      `https://us-central1-highkeystaff.cloudfunctions.net/users/getEmployeeById/id?id=${inputValues.highKeyId}`,
      //  `http://127.0.0.1:5001/highkeystaff/us-central1/users/getEmployeeById/id?id=${inputValues.highKeyId}`,
      payroll: 
      `https://us-central1-highkeystaff.cloudfunctions.net/users/getEmployeeByPayroll/payroll?payroll=${inputValues.payroll}`,
      // `http://127.0.0.1:5001/highkeystaff/us-central1/users/getEmployeeByPayroll/payroll?payroll=${inputValues.payroll}`,
      firstName: 
      `https://us-central1-highkeystaff.cloudfunctions.net/users/getEmployeesByFN/firstName?firstName=${inputValues.firstName}`,
      // `http://127.0.0.1:5001/highkeystaff/us-central1/users/getEmployeesByFN/firstName?firstName=${inputValues.firstName}`,
      lastName:
      `https://us-central1-highkeystaff.cloudfunctions.net/users/getEmployeesByLN/lastName?lastName=${inputValues.lastName}`,
      //  `http://127.0.0.1:5001/highkeystaff/us-central1/users/getEmployeesByLN/lastName?lastName=${inputValues.lastName}`,
    };
  
    fetch(endpointMap[searchType])
      .then((response) => response.json())
      .then((data) => {
        console.log(`Data desde el searchBy() en ${searchType}:`, data);
        if (data.message === undefined) {
          if (searchType === 'highKeyId') {
          console.log("dataq", [data])
            this.formData = [data];
          } else {
            const employees = data.map((emp) => {
              console.log('EMP: ', emp);
              return emp;
            });
            console.log("employessq", employees)
            this.formData = employees;
          }
          //this.formData = this.formData.map((item) => ({ data: item, selected: false }));
          console.log(`this.formData ${searchType}: `, this.formData);
        } 
        
        else {
          console.log('No se encontró un empleado con el valor proporcionado');
          this.clearFormData();
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        this.clearFormData();
      });
  }
  
  handleRowClickEMP(event, selectedIndex) {
    // Prevenir que el clic en el checkbox propague al hacer clic en la fila
    event.stopPropagation();
    //console.log('selectedIndex: ',selectedIndex)
    //console.log('selectedIndex que cambia: ',this.selectedRowIndex)
    
    if(this.formData.length > 1){
      if (this.selectedRowIndex !== -1) {
        this.formData[this.selectedRowIndex].selected = false; 
      }
    }
    
    // Marca la fila seleccionada
    this.selectedRowIndex = selectedIndex;
    this.formData[selectedIndex].selected = true;

    this.formData.forEach((employee, index) => {
      if (index === selectedIndex) {
        
        console.log('EMPLOYEE: ',employee,index)
      }
    });
  }

  //BUSQUEDA SOLO CON EL HIGHKEYID
  /*
  searchByHighkeyId() {
    console.log('searchByHighkeyId() se está ejecutando');
    //console.log('Valor del input searchHighKey: ',this.searchHighKey);
    const highKey = this.filterInput.nativeElement.value;
    console.log('Valor del input HighKey: ',highKey);
    if (highKey) {
      fetch(`https://us-central1-highkeystaff.cloudfunctions.net/users/getEmployeeById/id?id=${highKey}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Data desde el searchByHighkeyId():',data)
          if (data.message === undefined) {
            this.formData = data.data;
            this.formData.id = data.id;
            // Asignar los valores al formulario
            this.employeesForm.patchValue({
              firstName: data.data.firstname,
              lastName: data.data.lastname,
              phone: data.data.phone,
              email: data.data.email,
              // Otros campos si los tienes
            });
          } else {
            // No se encontró un empleado con el Highkey Id proporcionado
            // Puedes mostrar un mensaje de error al usuario aquí si lo deseas
            console.log('No se encontró un empleado con el Highkey Id proporcionado');
            this.clearFormData(); // Limpia el formulario en caso de error
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
          // Puedes manejar el error de alguna manera aquí si lo deseas
          this.clearFormData(); // Limpia el formulario en caso de error
        });
    } 
  }
*/

  // Método para limpiar el formulario
  clearFormData() {
    this.formData = {
      id: '',
      // Otras propiedades del formulario
    };
    this.employeesForm.reset(); // Restablece el formulario a su estado inicial
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
      // console.log('ENTRO AL IF');
      // Marca la fila seleccionada usando la clave compuesta de posición y hora
      //this.selectedRows[`${positionKey}-${hourKey}`] = true;
      if (this.selectedPosition !== null && this.selectedHour !== null) {
        this.selectedPosition = null;
        this.selectedHour = null;
        this.selectedRate = null
      }
      
      this.selectedPosition = positionKey;
      this.selectedHour = hourKey;
      this.selectedRate = rateValue;
      
    } else {
      // console.log('ENTRO AL ELSE');
      // Desmarca la fila seleccionada
      //delete this.selectedRows[`${positionKey}-${hourKey}`];
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
      //this.formData = this.employeesForm.value;
     
      const newPositionName = this.selectedPosition;
      const objetoSeleccionado = this.formData.find(item => item.selected === true);
      // Ahora objetoSeleccionado contiene el objeto con selected: true
      const posicionSeleccionada = this.formData.indexOf(objetoSeleccionado);
      // Ahora posicionSeleccionada contiene la posición del objeto seleccionado
      console.log('Empleado seleccionado:',objetoSeleccionado);  
      //console.log('this.formData.positions: ', this.formData[posicionSeleccionada].data.positions)
      // Verifica si el nombre de la posición ya existe en formData.positions
      const positionExists = this.formData[posicionSeleccionada].data.positions.some(position => position.name === newPositionName);
      
      if (!positionExists) {
        // Si la posición no existe, crea un nuevo objeto de posición y agrégalo al array
        const newPosition = {
          rate: this.selectedRate , // Define el valor que corresponda a la tasa de la nueva posición
          name: newPositionName
        };
        objetoSeleccionado.data.positions.push(newPosition);
      }
      // Asegúrate de que this.formData.position y this.formData.hourFrom estén actualizados según los valores del formulario
      objetoSeleccionado.data.position = this.selectedPosition;
      objetoSeleccionado.data.hourFrom = this.selectedHour;
      objetoSeleccionado.data.rate = this.selectedRate;
      objetoSeleccionado.data.id= objetoSeleccionado.id
      // Puedes imprimir el array actualizado para verificarlo
     //console.log('formData.positions:', objetoSeleccionado.data.position);
      console.log('Objeto Seleccionado=> ', objetoSeleccionado.data);
      this.dialogRef.close(objetoSeleccionado.data);
    } else {
      // Si no hay fila seleccionada, muestra un mensaje de error o toma la acción apropiada
      console.log('No se ha seleccionado ninguna fila');
    }
  }
}
