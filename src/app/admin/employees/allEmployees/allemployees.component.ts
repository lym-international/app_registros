import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from './employees.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employees } from './employees.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil, TableElement } from '@shared';
import { DatePipe, formatDate } from '@angular/common';
import { OrderDataService } from 'app/_services/orderData.service';
import { delay } from 'rxjs/operators'; //Jairo
import { CheckInComponent } from './dialogs/check-in/check-in.component';
import { CheckOutComponent } from './dialogs/check-out/check-out.component';
import { BreakComponent } from './dialogs/break/break.component';
import { Timestamp } from "firebase/firestore";



@Component({
  selector: 'app-allemployees',
  templateUrl: './allemployees.component.html',
  styleUrls: ['./allemployees.component.scss'],
  providers: [DatePipe]
})
export class AllemployeesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'lastName',
    'firstName',
    'highKeyID',
    'payRollID',
    'position',
    'hourFrom',
    'in',
    'out',
    'break',
    'totalHours',
    //'department',
    //'role',
    //'degree',
    //'mobile',
    //'email',
    //'date',
    //'actions',
  ];

  exampleDatabase?: EmployeesService;
  selection = new SelectionModel<Employees>(true, []);
  index?: number;
  id?: number;
  employees?: Employees;
  public dataEmployees!: any;
  employeesData: any[] = [];
  public orderId!: string;
  public empleados: string;
  public employeesDatos: any[];
  employeesArray: any[] = [];
  isTblLoading = true;
  public checkIn!: any;
  public checkInTime!:any;
  public checkOutTime!:any
  showCheckInButton = false;
  showCheckOutButton = false;
  
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  
  dataSource!: ExampleDataSource;

  constructor(
    private datePipe: DatePipe,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public employeesService: EmployeesService,
    private snackBar: MatSnackBar,
    private orderDataService: OrderDataService,
    //private checkInService: CheckInService,
    
    
  ) {
    super();
    // this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
  }

  ngOnInit() {
    this.dataEmployees = this.orderDataService.getSelectedOrder();
    console.log('Data Order: ', this.dataEmployees)
    this.orderId = this.dataEmployees.id;
    this.getEmployees();
    this.loadData();
    
    
  }
  
  // Función para verificar la visibilidad de los botones al hacer clic en el checkbox
  onCheckboxClick(row: Employees) {
    console.log('dateCheckin antes IF: ', row.dateCheckin) 
    if (row.dateCheckin === null || row.dateCheckin === undefined) {
      console.log('dateCheckin', row.dateCheckin) 
      this.showCheckInButton = true;
      //this.showCheckOutButton = false;
      console.log('Si no hay checkIN: ')
      console.log('CheckIn button: ',this.showCheckInButton )
      //console.log('CheckOut button: ',this.showCheckOutButton )
      console.log('---------------------------------')
    } else {
      //this.showCheckInButton = false;
      this.showCheckOutButton = true;
      console.log('Si hay checkIN: ')
      //console.log('CheckIn button: ',this.showCheckInButton )
      console.log('CheckOut button: ',this.showCheckOutButton )
      console.log('---------------------------------')
    }
  }

  deleteInTime() {
    const selectedRows = this.selection.selected;
    selectedRows.forEach((row) => {
      row.in = "No Data"; // Set the "In" time to "No Data" for each selected employee
    });
    this.selection.clear(); // Clear the selection after updating the "In" times
  }
  
  getEmployees() {
    //`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`
    fetch(`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`)
      .then((response) => response.json())
      .then((data) => {
        this.isTblLoading = false;
        console.log("datadelRegistroJR", data);
  
        this.employeesArray = data.employees.map((employee) => {
          const employeeData = { ...employee.employee.data };
  
          const firstName = employeeData.firstname || "No data";
          const lastName = employeeData.lastname || "No data";
          const highKeyId = employeeData.employeeId || "No data";
          const position = employee.position || "No data";
          const totalHours = employee.hours || "No data";
          const payrollId = employeeData.payrollid || "No data";
          const brake = employee.break || "No data";
          const hourFrom = employee.hourFrom || "No data";
  
          let checkInTime = "No Data";
          if (employee.dateCheckin && employee.dateCheckin._seconds) {
            const checkIn = employee.dateCheckin._seconds;
            const checkInDate = new Date(checkIn * 1000);
            checkInTime = this.datePipe.transform(checkInDate, 'hh:mm a');
          }
  
          let checkOutTime = "No Data";
          if (employee.dateCheckout && employee.dateCheckout._seconds) {
            const checkOut = employee.dateCheckout._seconds;
            const checkOutDate = new Date(checkOut * 1000);
            checkOutTime = this.datePipe.transform(checkOutDate, 'hh:mm a');
          }
  
          return {
            ...employee,
            employee: {
              ...employee.employee,
              data: employeeData,
            },
            firstName: firstName,
            lastName: lastName,
            highKeyId: highKeyId,
            position: position,
            hours:  employee.hours,
            totalHours: totalHours,
            payRollId: payrollId,
            hourFrom: hourFrom,
            in: checkInTime,
            out: checkOutTime,
            break: brake,
          };
        });
  
        console.log('---------------------------');
        console.log('Array empleados: ');
        console.log(this.employeesArray);
        console.log('---------------------------');
  
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, this.employeesArray);
      })
      .catch((error) => {
        console.log(error)
        this.isTblLoading = false;
      });
  }
  
  
  
  
  mergeEmployeesData(newEmployeesData: any[]) {
    return newEmployeesData.map((newEmployee) => {
      // Buscar si el empleado ya existe en this.employeesArray
      const existingEmployee = this.employeesArray.find(emp => emp.orderId === newEmployee.orderId);
  
      // Si el empleado ya existe, combinar los datos actualizados
      if (existingEmployee) {
        return {
          ...existingEmployee,
          ...newEmployee,
        };
      } else {
        // Si el empleado no existe, simplemente devolver los datos nuevos
        return newEmployee;
      }
    });
  }
  
 
  
  
  refresh() {
    this.loadData();
  }

  getSelectedRow(): Employees | null {
    const selectedRows = this.selection.selected;
    if (selectedRows.length === 1) {
      return selectedRows[0];
    }
    return null;
  }
  onActionButtonClick() { //botones de acciones (ya no aplica)
    const selectedRows = this.getSelectedRows();
  if (selectedRows.length > 0) {
    // Realiza la acción con los objetos seleccionados, por ejemplo:
    console.log('Objetos seleccionados:', selectedRows);
  } else {
    console.log('Ningún objeto seleccionado.');
  }
  }
  getSelectedRows(): Employees[] {
    return this.selection.selected;
  }
  
  formatTwoDigits(value: number): string {
    return String(value).padStart(2, '0');
  }

 
  
  async checkInModal(selectedRows: Employees[]) {
    if (selectedRows.length > 0) {
      console.log('Empleados seleccionados para check-in:', selectedRows);
      const dialogRef = this.dialog.open(CheckInComponent, {
        data: {
          employees: this.employees,
          action: 'add',
        },
      });
  
      const result = await dialogRef.afterClosed().toPromise();
  
      this.showNotification(
        'snackbar-success',
        'Successful CheckIn...!!!',
        'bottom',
        'center'
      );
  
      const timestamp = Timestamp.fromDate(new Date(result));
      console.log('TimeStamp: ', timestamp);
      const checkInTimestamp = timestamp?.seconds || 0;
  
      // Filtrar y actualizar solo el empleado que hizo el check-in con sus datos actualizados
      const updatedEmployees = this.employeesArray.map((employee) => {
        if (selectedRows.some((row) => row.employee.data.employeeId === employee.employee.data.employeeId)) {
          return {
            ...employee,
            checkin: true,
            dateCheckin: {
              _seconds: checkInTimestamp,
              _nanoseconds: 0,
            },
            realCheckin: {
              _seconds: checkInTimestamp,
              _nanoseconds: 0,
            },
            dateCheckinRounded: {
              _seconds: checkInTimestamp,
              _nanoseconds: 0,
            },
          };
        }
        return employee;
      });
  
      console.log("updatedEmployees", updatedEmployees);
  
      const apiUrl = `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`//`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employees: updatedEmployees }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Actualización exitosa:', data);
          this.getEmployees(); // Llamar a la función getEmployees() para actualizar la tabla
          this.removeSelectedRows() //Actualiza la tabla para que no duplique el dato en el anterior empleado.
        })
        .catch((error) => {
          console.error('Error al actualizar:', error);
        });
    } else {
      console.log('Ningún empleado seleccionado para check-in.');
    }
  }
  
  

  
 

  // Función para calcular las horas trabajadas por un empleado según el método regular
/* calculateRegularHours(employee: Employee, checkOutTimestamp: number): number {
  // Aquí deberías implementar la lógica para calcular las horas trabajadas según el método regular
  // Utiliza las propiedades relevantes de la estructura del empleado para realizar el cálculo

  // Ejemplo: calcular la diferencia de tiempo en horas entre el check-in y el check-out
  const checkInTimestamp = employee.dateCheckin._seconds;
  const hoursWorked = (checkOutTimestamp - checkInTimestamp) / 3600;

  // Realiza las verificaciones adicionales según tus requerimientos

  return hoursWorked;
} */

  // Función para calcular las horas trabajadas por un empleado con pago por hora exacta
/* calculateExactHourPayment(employee: Employee, checkOutTimestamp: number): number {
  // Aquí deberías implementar la lógica para calcular las horas exactas trabajadas por el empleado
  // Utiliza las propiedades relevantes de la estructura del empleado para realizar el cálculo

  // Ejemplo: calcular la diferencia de tiempo en horas entre el check-in y el check-out
  const checkInTimestamp = employee.dateCheckin._seconds;
  const hoursWorked = (checkOutTimestamp - checkInTimestamp) / 3600;

  return hoursWorked;
} */


  // Función para calcular las horas trabajadas por un empleado
/* calculateHoursWorked(employee: Employee, checkOutTimestamp: number): number {
  if (this.order.exactHourPayment) {
    // Realizar el cálculo según el pago por hora exacta
    return this.calculateExactHourPayment(employee, checkOutTimestamp);
  } else {
    // Realizar el cálculo según el método regular
    return this.calculateRegularHours(employee, checkOutTimestamp);
  }
}
 */
roundHours(hour: number) {
  let decimal = (hour - Math.floor(hour));
  let trunc = Math.trunc(hour);


  let minutes = decimal * 60;
  minutes = Math.round(minutes);
  if (minutes >= 0 && minutes <= 7) {
    decimal = 0;
  } else if (minutes >= 8 && minutes <= 22) {
    decimal = 0.25;
  } else if (minutes >= 23 && minutes <= 37) {
    decimal = 0.5;
  } else if (minutes >= 38 && minutes <= 52) {
    decimal = 0.75;
  } else {
    decimal = 1.0;
  }
  let fixed = trunc + decimal;
  return fixed;
}

async checkOutModal(selectedRows: Employees[]) {
  if (selectedRows.length > 0) {
    console.log('Empleados seleccionados para check-out:', selectedRows);
    const dialogRef = this.dialog.open(CheckOutComponent, {
      data: {
        employees: this.employees,
        action: 'add',
      },
    });

    const result = await dialogRef.afterClosed().toPromise();

    this.showNotification(
      'snackbar-success',
      'Successful CheckOut...!!!',
      'bottom',
      'center'
    );

    const timestamp = Timestamp.fromDate(new Date(result));
    console.log('TimeStamp: ', timestamp);
    const checkOutTimestamp = timestamp?.seconds || 0;

    // Filtrar y actualizar solo los empleados seleccionados con sus datos actualizados
    const updatedEmployees = this.employeesArray.map((employee) => {
      if (selectedRows.some((row) => row.employee.data.employeeId === employee.employee.data.employeeId)) {

        const roundedHours = this.calculateHoursWorked(employee, checkOutTimestamp);
        // console.log("hoursWorked to send", hoursWorked)
        return {
          ...employee,
          checkout: true,
          dateCheckout: {
            _seconds: checkOutTimestamp,
            _nanoseconds: 0,
          },
          dateCheckoutRounded: {
            _seconds: checkOutTimestamp,
            _nanoseconds: 0,
          },
          status: 'Checked Out',
          hours: roundedHours.toFixed(2),
          break:0,
        };
      }
      return employee;
    });

    console.log('updatedEmployees', updatedEmployees);

    const apiUrl = `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`//`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employees: updatedEmployees }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Actualización exitosa:', data);
        this.getEmployees(); // Llamar a la función getEmployees() para actualizar la tabla
        this.removeSelectedRows()
      })
      .catch((error) => {
        console.error('Error al actualizar:', error);
      });
  } else {
    console.log('Ningún empleado seleccionado para check-out.');
  }
}
  

calculateHoursWorked(employee: Employees, checkOutTimestamp: number): number {
  // Aquí implementa la lógica para calcular las horas trabajadas
  // Utiliza las propiedades 'dateCheckin', 'dateCheckout', etc., del objeto 'employee'
  // para realizar el cálculo de manera adecuada
  // Luego devuelve el resultado como un número
/*   
 const lateThreshold = 8; // Umbral de llegada tarde en horas
 if (this.order.exactHourPayment) {
    let hoursNumberExact = this.calculateExactHourPayment(employee);
    const hours = hoursNumberExact.toFixed(2);
    employee.hours = hours;
  } else {
    let hoursNumber =
      (employee.dateCheckoutRounded.getTime() -
        employee.dateCheckinRounded.toDate().getTime()) /
      3600000;
    hoursNumber = this.roundHours(hoursNumber);

    if (hoursNumber < 5) {
      let late = this.validateCheckout1(
        employee.hourFrom,
        employee.dateCheckin.toDate()
      );
      if (late < 8) {
        hoursNumber = 5;
      } else {
        if (late > lateThreshold) {
          hoursNumber = this.calculateRegularHours(employee);
        }
      }
    }
  } */

  // Ejemplo:

  // const lateThreshold = 8; // Umbral de llegada tarde en horas
  const checkInTime = employee.dateCheckin._seconds;
  const checkOutTime = checkOutTimestamp;
  const secondsWorked = checkOutTime - checkInTime;
  const hoursWorked = secondsWorked / 3600;
  const roundedHours = this.roundHours(hoursWorked);
  return roundedHours;
}

validateCheckout1(hourFrom: string, checkinDate: Date): number {
  const [hour, minute] = hourFrom.split(":");
  const hourLimit = new Date(checkinDate);
  hourLimit.setHours(Number(hour), Number(minute), 0, 0);

  if (checkinDate.getTime() > hourLimit.getTime()) {
    const diff = Math.abs(checkinDate.getTime() - hourLimit.getTime());
    const minutes = Math.floor(diff / 60000);
    return minutes;
  }

  return 0;
}

calculateRegularHours(employee) {
  // Cálculo de horas trabajadas sin tener en cuenta la llegada tardía
  const hours = (employee.dateCheckoutRounded.getTime() - employee.dateCheckinRounded.toDate().getTime()) / 3600000;
  return Number(hours.toFixed(2));
}
calculateExactHourPayment(employee){

  const timeDiff = employee.dateCheckout.getTime() - employee.dateCheckin.toDate().getTime();
  const hours = timeDiff / (1000 * 60 * 60); // Convertir milisegundos a horas
  
  return Number(hours.toFixed(2));

    // const minutes = Math.round((timeDiff / (1000 * 60)) % 60); // Obtener los minutos redondeados
    // const hour = Math.floor(timeDiff / (1000 * 60 * 60)); // Obtener las horas enteras
    // console.log("horas trabajadas", hour)
    // console.log("minutos trabajados", minutes)
    
    //horas exactas;
    // console.log("hours", hours)
    
  }


 

  async breakModal(selectedRows: Employees[]) {
    if (selectedRows.length > 0) {
      console.log('Empleados seleccionados para break:', selectedRows);
      const dialogRef = this.dialog.open(BreakComponent, {
        data: {
          employees: this.employees,
          action: 'add',
        },
      });
  
      const result = await dialogRef.afterClosed().toPromise();
      console.log('Result break: ', result);
  
      this.showNotification(
        'snackbar-success',
        'Successful break...!!!',
        'bottom',
        'center'
      );
  
        // Redondear los minutos del tiempo de descanso
        const roundedBreak = this.roundHours(result.break / 60);

      // Convertir el tiempo de descanso de minutos a horas
      // const breakInHours = result.break / 60;
  
      // Filtrar y actualizar solo los empleados seleccionados con sus datos actualizados
      const updatedEmployees = this.employeesArray.map((employee) => {
        if (selectedRows.some((row) => row.employee.data.employeeId === employee.employee.data.employeeId)) {
          // Restar el tiempo de descanso del total de horas trabajadas
          // const updatedHours = employee.hours - breakInHours;
          const updatedHours = employee.hours - roundedBreak;
  
          return {
            ...employee,
            break: result.break,
            hours: updatedHours.toFixed(2),
          };
        }
        return employee;
      });
  
      console.log('updatedEmployees', updatedEmployees);
  
      const apiUrl = `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;//`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employees: updatedEmployees }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Actualización exitosa:', data);
          this.getEmployees(); // Llamar a la función getEmployees() para actualizar la tabla
          this.removeSelectedRows()
        })
        .catch((error) => {
          console.error('Error al actualizar:', error);
        });
    } else {
      console.log('Ningún empleado seleccionado para break.');
    }
  }
  
  

  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        employees: this.employees,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase?.dataChange.value.unshift(
          this.employeesService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  //Abre el modal FormDialogComponent para editar los datos.
  editCall(row: Employees) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        employees: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex !== undefined && this.exampleDatabase !== undefined) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.employeesService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
          this.showNotification(
            'black',
            'Edit Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }
  deleteItem(i: number, row: Employees) {
   /*  this.index = i;
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '270px',
      width: '300px',
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        if (foundIndex !== undefined && this.exampleDatabase !== undefined) {
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
          this.showNotification(
            'snackbar-danger',
            'Delete Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    }); */
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase?.dataChange.value.splice(index, 1);

      this.refreshTable();
      this.selection = new SelectionModel<Employees>(true, []);
    });
    /*this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );*/
  }

  //buscador
  public loadData() {
    this.exampleDatabase = new EmployeesService(this.httpClient);
    //this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, this.employeesArray);
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }    
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }


  // export table data in excel file
  exportExcel() {
    
    /* // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        Name: x.name,
        Position: x.position,
        HighKeyID: x.highKeyID,
        PayRollID: x.payRollID,
        'CheckIn': formatDate(new Date(x.in), 'yyyy-MM-dd', 'en') || '',
        Out: x.out,
        Break: x.break,
        TotalHours: x.totalHours,
        //Department: x.department,
        //Role: x.role,
        //'Joining Date': formatDate(new Date(x.date), 'yyyy-MM-dd', 'en') || '',
        //Degree: x.degree,
        //Mobile: x.mobile,
        //Email: x.email,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
   */
  
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: Employees) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}
export class ExampleDataSource extends DataSource<Employees> {
  data: any[];
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Employees[] = [];
  renderedData: Employees[] = [];
  constructor(
    
    public exampleDatabase: EmployeesService,
    public paginator: MatPaginator,
    public _sort: MatSort,

    public employeesArray: any[]

  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Employees[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
   
    this.exampleDatabase.getAllEmployeess();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.employeesArray
          .slice()
          .filter((employees: Employees) => {
            const searchStr = (
              employees.lastName +
              employees.firstName +
              employees.highKeyId +
              employees.payRollId +
              employees.position +
              employees.hourFrom +
              employees.in +
              employees.out +
              employees.break +
              employees.totalHours 
              //employees.department +
              //employees.role +
              //employees.degree +
              //employees.email +
              //employees.mobile
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);
        // console.log("startIndex", startIndex)
        // console.log("this.paginator.pageSize", this.paginator.pageSize)
        // console.log("antesdel renderr", this.employeesArray)
        // this.renderedData = this.employeesArray.slice(startIndex, this.paginator.pageSize);
        // console.log("this.renderedData", this.renderedData)


        return this.renderedData;
      })
    );
  }
  disconnect() {
    // disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: Employees[]): Employees[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'firstName':
          [propertyA, propertyB] = [a.firstName, b.firstName];
          break;
        case 'lastName':
          [propertyA, propertyB] = [a.lastName, b.lastName];
          break;
        case 'highKeyID':
          [propertyA, propertyB] = [a.highKeyId, b.highKeyId]; //Diego
          break;
        case 'position':
          [propertyA, propertyB] = [a.position, b.position]; //Diego
          break;  
        case 'totalHours':
          [propertyA, propertyB] = [a.totalHours, b.totalHours]; //Diego
          break;  
        case 'payRollID':
          [propertyA, propertyB] = [a.payRollId, b.payRollId]; //Diego
          break;
          case 'hourFrom':
            [propertyA, propertyB] = [a.hourFrom, b.hourFrom]; //Diego
            break;  
        case 'in':
          [propertyA, propertyB] = [a.in, b.in]; //Diego
          break;  
        case 'out':
          [propertyA, propertyB] = [a.out, b.out]; //Diego
          break;  
        
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
