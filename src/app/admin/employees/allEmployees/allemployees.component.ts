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
import { AllActionsComponent } from './dialogs/all-actions/all-actions.component';
import { Timestamp } from 'firebase/firestore';
import { AuthenticationService } from 'app/_services/authentication.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ActivatedRoute } from '@angular/router';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-allemployees',
  templateUrl: './allemployees.component.html',
  styleUrls: ['./allemployees.component.scss'],
  providers: [DatePipe],
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
  public exactHourPayment: boolean;
  public empleados: string;
  public employeesDatos: any[];
  employeesArray: any[] = [];
  isTblLoading = true;
  public checkIn!: any;
  public checkInTime!:any;
  public checkOutTime!:any
  showCheckInButton = false;
  showCheckOutButton = false;
  showBreakButton = false;
  showNoShowButton = false;
  public dataUser!: any; 
  groupEmployees = [];
  public timeSheet: any = {};
  public outEmployees = [];
  public pdfEmployees = [];
  totalHoursArray: number[] = [];
  totalHoursSum: number;
  updatedHours: number

  
  
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
    public authenticationService: AuthenticationService,
    //private checkInService: CheckInService,
    private route: ActivatedRoute
    
    
  ) {
    super();
    // this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
  }

  ngOnInit() {
    this.dataEmployees = this.orderDataService.getSelectedOrder();
    console.log('Data Order: ', this.dataEmployees);
    this.orderId = this.dataEmployees.id;
    this.exactHourPayment = this.dataEmployees.data.exactHourPayment;
    this.getEmployees();
    this.loadData();
    this.dataUser = this.authenticationService.getData();
    // const storedUserData = localStorage.getItem('currentUserData');
    const storedUserData = localStorage.getItem('currentUserData');
    if (storedUserData) {
      this.dataUser = JSON.parse(storedUserData);
    } else {
      // Si no se encuentran los datos en el localStorage, obtenerlos del servicio
      this.dataUser = this.authenticationService.getData();
      // Almacenar los datos en el localStorage
      localStorage.setItem('currentUserData', JSON.stringify(this.dataUser));
    }
    this.route.queryParams.subscribe(params => {
      if (params) {
        // Now you can use the params object directly in Component B
        console.log('FormData en AllEmployees:', params);
      }
    });
    
  }
  
  // Función para verificar la visibilidad de los botones al hacer clic en el checkbox
  onCheckboxClick(row: Employees) {
    console.log('dateCheckin antes IF: ', row.dateCheckin) 
    if ((row.dateCheckin === null || row.dateCheckin === undefined)&&(row.dateCheckout === null || row.dateCheckout === undefined)) {
      console.log('dateCheckin', row.dateCheckin) 
      this.showCheckInButton = true;
      this.showCheckOutButton = false;
      this.showBreakButton = false;
      this.showNoShowButton = true;
      console.log('Si no hay checkIN: ')
      console.log('CheckIn button: ',this.showCheckInButton)
      console.log('NoShow button: ',this.showNoShowButton)
      //console.log('CheckOut button: ',this.showCheckOutButton )
      console.log('---------------------------------')
    }
    else if((row.dateCheckin !== null || row.dateCheckin !== undefined)&&(row.dateCheckout === null || row.dateCheckout === undefined)) {
      this.showCheckInButton = false;
      this.showCheckOutButton = true;
      this.showBreakButton = true;
      this.showNoShowButton = false;
      console.log('Si hay checkIN y no hay checkOut: ')
      console.log('CheckOut button: ',this.showCheckOutButton )
      console.log('Break button: ',this.showBreakButton )
      console.log('---------------------------------')
    }  
    else if ((row.dateCheckout !== null || row.dateCheckout !== undefined)&&(row.break === null || row.break === undefined || row.break === "0")){
      this.showCheckInButton = false;
      this.showCheckOutButton = false;
      this.showBreakButton = true;
      this.showNoShowButton = false;
      console.log('Si hay checkIN y hay checkOut: ')
      console.log('Break button: ',this.showBreakButton )
      console.log('---------------------------------')
    }
    else {
      this.showCheckInButton = false;
      this.showCheckOutButton = false;
      this.showBreakButton = false;
      this.showNoShowButton = false;
      console.log('Si hay checkIN, checkOut y Break: Botones no visibles')
      console.log('---------------------------------')
    }
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
          const totalHours = employee.hours || 0;
          const payrollId = employeeData.payrollid || "No data";
          const brake = employee.break || "0";
          const hourFrom = employee.hourFrom || "No data";
  
          let checkInTime = "No Data";
          if (employee.dateCheckin && employee.dateCheckin._seconds) {
            const checkIn = employee.dateCheckin._seconds;
            const checkInDate = new Date(checkIn * 1000);
            checkInTime = this.datePipe.transform(checkInDate, 'hh:mm a');
          }

          let checkOutTime = 'No Data';
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
            hours: employee.hours,
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

        this.dataSource = new ExampleDataSource(
          this.exampleDatabase,
          this.paginator,
          this.sort,
          this.employeesArray
        );
        
        //SUMANDO LOS TOTALES DE LAS HORAS TRABAJADAS

        this.totalHoursArray = [];
        //creando el arreglo y llenándolo con los valores de la propiedad hours de amployeeArray
        //console.log('ARRAY EmployeeArray: ',this.employeesArray)
        for (const item of this.employeesArray) {
          this.totalHoursArray.push(item.hours);
        }
        //console.log('Horas ARRAY: ', this.totalHoursArray)
        
        //convirtiendo los valores de totalHoursArray a tipo number
        const numberArray = this.totalHoursArray.map((stringValue) => {
          return Number(stringValue);
        });
        
        //Sumando los valores del arreglo
        this.totalHoursSum = numberArray.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        
        //console.log('Suma Total Horas: ', this.totalHoursSum);
      })
      .catch((error) => {
        console.log(error);
        this.isTblLoading = false;
      });
  }

  deleteInTime(selectedRows: Employees[]) {
    if (selectedRows.length > 0) {
      // Filtrar y actualizar solo el empleado que hizo el check-in con sus datos actualizados
      const updatedEmployees = this.employeesArray.map((employee) => {
        if (
          selectedRows.some(
            (row) =>
              row.employee.data.employeeId === employee.employee.data.employeeId && 
              row.hourFrom === employee.hourFrom,
          )
        ) {
          return {
            ...employee,
            checkin: false,
            dateCheckin: "-",
            realCheckin: "-",
            dateCheckinRounded: "-",
            checkout: false,
            dateCheckout: "-",
            dateCheckoutRounded: "-",
            updateUser:this.dataUser.email,
            status: 'reseted',
            hours: 0,
            break: 0,
            in: 'No Data',
            out: 'No Data',
            totalHours:0,

          };
        }
        return employee;
      });

      console.log('updatedEmployees', updatedEmployees);

      const apiUrl = `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`; //`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`; //`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employees: updatedEmployees }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('Actualización exitosa:', data);
          this.getEmployees(); // Llamar a la función getEmployees() para actualizar la tabla
          this.removeSelectedRows();
        })
        .catch((error) => {
          console.error('Error al actualizar:', error);
        });
    } else {
      // console.log('Ningún empleado seleccionado para check-in.');
    }
  }

//Noshow
  outEmployee(selectedRows: Employees[]) {
    if (selectedRows.length > 0) {
      // Filtrar y actualizar solo el empleado que hizo el check-in con sus datos actualizados
      const updatedEmployees = this.employeesArray.map((employee) => {
        if (
          selectedRows.some(
            (row) =>
              row.employee.data.employeeId === employee.employee.data.employeeId &&
              row.hourFrom === employee.hourFrom,
          )
        ) {
          return {
            ...employee,
            checkin: false,
            checkout: false,
            dateCheckin : "-",
            dateCheckout : "-",
            realCheckin: "-",
            updateUser:this.dataUser.email,
            status: 'No show',
            hours: 0,
            break: 0,
            totalHours:0
          };
        }
        return employee;
      });

      console.log('updatedEmployees', updatedEmployees);

      const apiUrl = `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`; // `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`; //`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employees: updatedEmployees }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('Actualización exitosa:', data);
          this.getEmployees(); // Llamar a la función getEmployees() para actualizar la tabla
          this.removeSelectedRows();
        })
        .catch((error) => {
          console.error('Error al actualizar:', error);
        });
    } else {
      // console.log('Ningún empleado seleccionado para check-in.');
    }
  }

  mergeEmployeesData(newEmployeesData: any[]) {
    return newEmployeesData.map((newEmployee) => {
      // Buscar si el empleado ya existe en this.employeesArray
      const existingEmployee = this.employeesArray.find(
        (emp) => emp.orderId === newEmployee.orderId
      );

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

  //MODAL ALLACTIONS

  async allActionsModal(selectedRows: Employees[]) {
    if (selectedRows.length > 0) {
      
      const dialogRef = this.dialog.open(AllActionsComponent)
      
      /*const dialogRef = this.dialog.open(AllActionsComponent, {
        data: {
          employees: this.employees,
          action: 'add',
        },
      });*/

      const result = await dialogRef.afterClosed().toPromise();
      
      const roundedBreak = this.roundHours(result.break / 60);
      
      const timestampIn = Timestamp.fromDate(new Date(result.startDate));
      const timestampOut = Timestamp.fromDate(new Date(result.endDate));

      const checkInTimestamp = timestampIn?.seconds || 0;
      const checkOutTimestamp = timestampOut?.seconds || 0;
      
      const  roundedIn = this.roundDate(result.startDate);
      const  roundedOut = this.roundDate(result.endDate);

      const timestampCheckinRounded= Timestamp.fromDate(new Date(roundedIn));
      const timestampCheckoutRounded = Timestamp.fromDate(new Date(roundedOut));
      
      const dateCheckinRounded = timestampCheckinRounded?.seconds || 0;
      const dateCheckoutRounded = timestampCheckoutRounded?.seconds || 0;
      

      // Filtrar y actualizar solo el empleado que hizo el check-in con sus datos actualizados
      const updatedEmployees = this.employeesArray.map((employee) => {
        if (
          selectedRows.some(
            (row) =>
            row.employee.data.employeeId === employee.employee.data.employeeId &&
            row.hourFrom === employee.hourFrom,
            )
            ) {
              
                const roundedHours = this.calculateHoursWorkedAll(
                  employee,
                  checkInTimestamp,
                  dateCheckinRounded,
                  checkOutTimestamp,
                  dateCheckoutRounded,
                  
                );
              console.log('roundedHours: ',roundedHours)  
              console.log('result.break: ',result.break)  
              
              if(roundedHours==5){
                this.updatedHours = roundedHours 
              } else{
                this.updatedHours =  roundedHours - roundedBreak;
              }

              return {
            ...employee,
            checkin: true,
            checkout: true,
            break: result.break,
            status : "Checked Out",
            dateCheckin: {
              _seconds: checkInTimestamp,
              _nanoseconds: 0,
            },
            realCheckin: {
              _seconds: checkInTimestamp,
              _nanoseconds: 0,
            },
            dateCheckinRounded: {
              _seconds: dateCheckinRounded,
              _nanoseconds: 0,
            },
            dateCheckout: {
              _seconds: checkOutTimestamp,
              _nanoseconds: 0,
            },
            dateCheckoutRounded: {
              _seconds: dateCheckoutRounded,
              _nanoseconds: 0,
            },
            hours: this.updatedHours.toFixed(2),
            updateUser:this.dataUser.email
          };
        // }
        }
        return employee;
      });
  
      console.log("updatedEmployees ALLActionsModal: ", updatedEmployees);
  
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
          this.showNotification(
            'snackbar-success',
            'Successful update!!!',
            'bottom',
            'center'
          );
          //console.log('Actualización exitosa:', data);
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

      const timestamp = Timestamp.fromDate(new Date(result));
      //console.log('TimeStamp: ', timestamp);
      const checkInTimestamp = timestamp?.seconds || 0;
      const  rounded = this.roundDate(result);
    const timestampCheckinRounded= Timestamp.fromDate(new Date(rounded));
    const dateCheckinRounded = timestampCheckinRounded?.seconds || 0;

      // Filtrar y actualizar solo el empleado que hizo el check-in con sus datos actualizados
      const updatedEmployees = this.employeesArray.map((employee) => {
        if (
          selectedRows.some(
            (row) =>
            row.employee.data.employeeId === employee.employee.data.employeeId &&
            row.hourFrom === employee.hourFrom,
            )
            ) {
              // Si updateUser es null o undefined, inicializarlo como un arreglo vacío
              // const updatedUser = [...(employee.updateUser || []), this.dataUser.email];
              // const emailAlreadyExists = updatedUser.includes(this.dataUser.email);
              // if (!emailAlreadyExists) {
            return {
            ...employee,
            checkin: true,
            status : "Checked In",
            dateCheckin: {
              _seconds: checkInTimestamp,
              _nanoseconds: 0,
            },
            realCheckin: {
              _seconds: checkInTimestamp,
              _nanoseconds: 0,
            },
            dateCheckinRounded: {
              _seconds: dateCheckinRounded,
              _nanoseconds: 0,
            },
            // updateUser:this.dataUser.email
            // updateUser: [...updatedUser, this.dataUser.email],
            // updateUser: 
            updateUser:this.dataUser.email
            
          };
        // }
        }
        return employee;
      });
  
      console.log("updatedEmployees: ", updatedEmployees);
  
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
          this.showNotification(
            'snackbar-success',
            'Successful CheckIn...!!!',
            'bottom',
            'center'
          );
          //console.log('Actualización exitosa:', data);
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

  roundDate(date: Date) {
    let roundedDate = date;
    roundedDate.setSeconds(0, 0);
    let minutes = roundedDate.getMinutes();
    let sum = 0;
    roundedDate.setMinutes(0);
    if (minutes >= 0 && minutes <= 7) {
      sum = 0;
    } else if (minutes >= 8 && minutes <= 22) {
      sum = 15;
    } else if (minutes >= 23 && minutes <= 37) {
      sum = 30;
    } else if (minutes >= 38 && minutes <= 52) {
      sum = 45;
    } else {
      sum = 60;
    }
    roundedDate.setMinutes(sum);
    return roundedDate;
  }

  roundHours(hour: number) {
    let decimal = hour - Math.floor(hour);
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
      // console.log('Empleados seleccionados para check-out:', selectedRows);
      const dialogRef = this.dialog.open(CheckOutComponent, {
        data: {
          employees: this.employees,
          action: 'add',
        },
      });

      const result = await dialogRef.afterClosed().toPromise();

      const timestamp = Timestamp.fromDate(new Date(result));
      // console.log('TimeStamp: ', timestamp);
      const checkOutTimestamp = timestamp?.seconds || 0;
      const rounded = this.roundDate(result);
      const timestampCheckoutRounded = Timestamp.fromDate(new Date(rounded));
      const dateCheckoutRounded = timestampCheckoutRounded?.seconds || 0;
      // Filtrar y actualizar solo los empleados seleccionados con sus datos actualizados
      const updatedEmployees = this.employeesArray.map((employee) => {
        if (
          selectedRows.some(
            (row) =>
              row.employee.data.employeeId === employee.employee.data.employeeId && 
              row.hourFrom === employee.hourFrom,
          )
        ) {
          const roundedHours = this.calculateHoursWorked(
            employee,
            checkOutTimestamp,
            dateCheckoutRounded
          );
          // console.log("hoursWorked to send", hoursWorked)
          return {
            ...employee,
            checkout: true,
            dateCheckout: {
              _seconds: checkOutTimestamp,
              _nanoseconds: 0,
            },
            dateCheckoutRounded: {
              _seconds: dateCheckoutRounded,
              _nanoseconds: 0,
            },
            updateUser:this.dataUser.email,
            status: 'Checked Out',
            hours: roundedHours.toFixed(2),
            break: 0,
          };
        }
        return employee;
      });

      console.log('updatedEmployees CHECKOUT', updatedEmployees);

      const apiUrl = `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`; //`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`; //`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employees: updatedEmployees }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.showNotification(
            'snackbar-success',
            'Successful CheckOut...!!!',
            'bottom',
            'center'
          );
          // console.log('Actualización exitosa:', data);
          this.getEmployees(); // Llamar a la función getEmployees() para actualizar la tabla
          this.removeSelectedRows();
        })
        .catch((error) => {
          console.error('Error al actualizar:', error);
        });
    } else {
      // console.log('Ningún empleado seleccionado para check-out.');
    }
  }

  calculateHoursWorkedAll(
    employee: Employees,
    checkInTimestamp: number,
    dateCheckinRounded: number,
    checkOutTimestamp: number,
    dateCheckoutRounded: number,
    //roundedBreak: number
  ): number {
 
    if (this.exactHourPayment) {
      //console.log('Entró al IF')
      const hoursNumberExact = this.calculateExactHourPaymentAll(
        checkInTimestamp,
        checkOutTimestamp,
        //roundedBreak
      );
      // const hours = hoursNumberExact.toFixed(2);
      return hoursNumberExact;
    } else {
      //console.log('Entró al else')
      const lateThreshold = 8; // Umbral de llegada tarde en horas
      const checkInTime = dateCheckinRounded;
      const checkOutTime = dateCheckoutRounded;
      //const breakTime = roundedBreak;
      const secondsWorked = checkOutTime - checkInTime;
      const hoursWorked = secondsWorked / 3600; //3600000
      // console.log("oursWorked", hoursWorked)
      let hoursNumber = this.roundHours(hoursWorked);
      const roundedHours = this.roundHours(hoursWorked);

      if (hoursNumber < 5) {
        const dateCheckin = new Date(checkInTimestamp * 1000);
        let late = this.validateCheckout1(employee.hourFrom, dateCheckin);
        
        if (late < 8) {
          hoursNumber = 5;
        } else {
          if (late > lateThreshold) {
            // hoursNumber = lateThreshold;
            hoursNumber = this.calculateRegularHoursAll(
              dateCheckinRounded,
              dateCheckoutRounded
            );
          }
        }
      }
      return hoursNumber;
    }
  }

  calculateHoursWorked(
    employee: Employees,

    checkOutTimestamp: number,
    dateCheckoutRounded: number
  ): number {
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
  } 
  */

    // this.exactHourPayment
    console.log('EMPLOYEE: ', employee)
    if (this.exactHourPayment) {
      const hoursNumberExact = this.calculateExactHourPayment(
        employee,
        checkOutTimestamp
      );
      // const hours = hoursNumberExact.toFixed(2);
      return hoursNumberExact;
    } else {
      const lateThreshold = 8; // Umbral de llegada tarde en horas
      const checkInTime = employee.dateCheckinRounded._seconds;
      const checkOutTime = dateCheckoutRounded;

      // console.log("Jr checkInTime", checkInTime)
      // console.log("Jr checkOutTime", checkOutTime)
      const secondsWorked = checkOutTime - checkInTime;
      const hoursWorked = secondsWorked / 3600; //3600000
      // console.log("oursWorked", hoursWorked)
      let hoursNumber = this.roundHours(hoursWorked);
      const roundedHours = this.roundHours(hoursWorked);

      if (hoursNumber < 5) {
        // console.log("employe", employee.dateCheckin)
        // console.log("employee.dateCheckin", employee.dateCheckin);
        // console.log("employee.dateCheckin", employee.dateCheckin)
        // console.log("employee.dateCheckin.toDate()", employee.dateCheckin.toDate())

        const dateCheckin = new Date(employee.dateCheckin._seconds * 1000);
        // console.log("employee.hourFrom", employee.hourFrom)
        // console.log("employe", dateCheckin);

        let late = this.validateCheckout1(employee.hourFrom, dateCheckin);
        if (late < 8) {
          hoursNumber = 5;
        } else {
          if (late > lateThreshold) {
            // hoursNumber = lateThreshold;
            hoursNumber = this.calculateRegularHours(
              employee,
              dateCheckoutRounded
            );
          }
        }
      }
      return hoursNumber;
    }
  }

  validateCheckout1(hourFrom, checkinDate) {
    const [hour, minute] = hourFrom.split(':');
    const hourLimit = new Date(checkinDate);
    hourLimit.setHours(hour, minute, 0, 0);

    if (checkinDate.getTime() > hourLimit.getTime()) {
      const diff = Math.abs(checkinDate.getTime() - hourLimit.getTime());
      const minutes = Math.floor(diff / 60000);
      return minutes;
    }

    return 0;
  }
  
  calculateRegularHoursAll(dateCheckinRounded: number, dateCheckoutRounded: number) {
   
    //Cálculo de horas trabajadas sin tener en cuenta la llegada tardía;
    // Conversión manual del timestamp a objeto Date
    const checkinTime = new Date(dateCheckinRounded * 1000);
    const checkOutTime = new Date(dateCheckoutRounded * 1000);
    const hours = (checkOutTime.getTime() - checkinTime.getTime()) / 3600000;
    return Number(hours.toFixed(2));
  }

  calculateRegularHours(employee: Employees, dateCheckoutRounded: number) {
    /* console.log("Cálculo de horas trabajadas sin tener en cuenta la llegada tardía")

  // Conversión manual del timestamp a objeto Date
  const checkinTime = new Date(employee.dateCheckin._seconds * 1000);
  console.log("checkinTime", checkinTime)
  console.log("checkOutTimestamp", checkOutTimestamp)
  const checkOutTime = new Date(checkOutTimestamp)
  console.log("checkOutTime", checkOutTime)
  // const checkoutTime = checkOutTimestamp.toDate();

  // const hours = (checkoutTime.getTime() - checkinTime.getTime()) / 3600000;
  // return Number(hours.toFixed(2));
  return 108 */
    //Cálculo de horas trabajadas sin tener en cuenta la llegada tardía;
    // Conversión manual del timestamp a objeto Date
    const checkinTime = new Date(employee.dateCheckinRounded._seconds * 1000);
    // console.log("checkinTime", checkinTime);
    // console.log("checkOutTimestamp", dateCheckoutRounded);
    const checkOutTime = new Date(dateCheckoutRounded * 1000);
    // console.log("checkOutTime", checkOutTime);

    const hours = (checkOutTime.getTime() - checkinTime.getTime()) / 3600000;
    return Number(hours.toFixed(2));
  }
  
  //Aplica solo para dos clientes específicos
  calculateExactHourPaymentAll(checkInTimestamp: number, checkOutTimestamp: number) {
    const checkInTime = checkInTimestamp;
    const checkOutTime = checkOutTimestamp;
    //const breakTime = roundedBreak;

    const secondsWorked = checkOutTime - checkInTime;
    const hoursWorked = secondsWorked / 3600;
    
    

    return Number(hoursWorked.toFixed(2));
  }

  calculateExactHourPayment(employee: Employees, checkOutTimestamp: number) {
    const checkInTime = employee.dateCheckin._seconds;
    const checkOutTime = checkOutTimestamp;

    const secondsWorked = checkOutTime - checkInTime;
    const hoursWorked = secondsWorked / 3600;
    /* console.log("in", checkInTime)
  console.log("out", checkOutTime)
  console.log("timeDiff",secondsWorked)
  console.log("ours", hoursWorked) */
    return Number(hoursWorked.toFixed(2));

    // const timeDiff = employee.dateCheckout.getTime() - employee.dateCheckin.toDate().getTime();
    // const hours = timeDiff / (1000 * 60 * 60); // Convertir milisegundos a horas

    // return Number(hours.toFixed(2));

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
      //console.log('Result break: ', result);
      const roundedBreak = this.roundHours(result.break / 60);
      // Convertir el tiempo de descanso de minutos a horas
      // const breakInHours = result.break / 60;
      const updatedEmployees = this.employeesArray.map((employee) => {
        if (
          selectedRows.some(
            (row) =>
              row.employee.data.employeeId === employee.employee.data.employeeId && 
              row.hourFrom === employee.hourFrom,
          )
        ) {
          // Restar el tiempo de descanso del total de horas trabajadas
          // const updatedHours = employee.hours - breakInHours;
          console.log('employee.hours :',employee.hours)
          console.log('roundedBreak :',roundedBreak)

          if(employee.hours==5){
            this.updatedHours = employee.hours
          } else{
            this.updatedHours =  employee.hours - roundedBreak;
          }

          //const updatedHours = employee.hours - roundedBreak;
          return {
            ...employee,
            updateUser:this.dataUser.email,
            break: result.break,
            hours: this.updatedHours,//.toFixed(2),
          };
        }
        return employee;
      });

      console.log('updatedEmployees', updatedEmployees);
  
      const apiUrl = `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`; //`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`; //`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employees: updatedEmployees }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.showNotification(
            'snackbar-success',
            'Successful break...!!!',
            'bottom',
            'center'
          );
          // console.log('Actualización exitosa:', data);
          this.getEmployees(); // Llamar a la función getEmployees() para actualizar la tabla
          this.removeSelectedRows()
        })
        .catch((error) => {
          console.error('Error al actualizar:', error);
        });
    } else {
      // console.log('Ningún empleado seleccionado para break.');
    }
  }

  async loadTimesheet() {
    this.outEmployees = [];
    this.pdfEmployees = [];
    let total = 0;
     if (this.employeesArray) {
     await this.employeesArray.forEach((emp) => {
        this.outEmployees.push(emp);
        if (emp.checkout) {
          total += Number(emp.hours);
          this.pdfEmployees.push(emp);
        }
      });
     }
    /* this.employeesArray.forEach((emp) => {
      this.outEmployees.push(emp);
    }); */
    // this.timeSheet.employees = this.outEmployees;
    this.timeSheet.total = total.toFixed(2);

    //
    //
  }

  getEmployeesObject(employees) {
    return {
      columns: [
        { width: '*', text: ''},
        {
          width: 'auto', 
          alignment: 'left', // Alineación central dentro de la columna
          table: {
            widths: [
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
            ],
            body: [
              [
                {
                  text: "No",
                  style: "tableHeader",
                },
                {
                  text: "LAST NAME",
                  style: "tableHeader",
                },
                {
                  text: "FIRST NAME",
                  style: "tableHeader",
                },
                {
                  text: "HK ID",
                  style: "tableHeader",
                },
                {
                  text: "IN",
                  style: "tableHeader",
                },
                {
                  text: "BREAK",
                  style: "tableHeader",
                },
                {
                  text: "OUT",
                  style: "tableHeader",
                },
                {
                  text: "TOTAL",
                  style: "tableHeader",
                },
                
              ],
              // this.groupEmployees
              ...this.groupEmployees.map((emp) => {
                return emp;
              }),
            ],
            
          },
        },
        
        // {alignment: 'left',
        //  margin: [0, 0, 0, 0],
        // },
        {  alignment: 'left',  margin: [30, 10, 0, 10],   text: ''},
         
      ]
    };
  }
  
  async getDocumentDefinition() {

    async function getImageAsBase64(url) {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    let generated = this.datePipe.transform (Date.now(), "MMMM d, y");
    const logoBase64 = await getImageAsBase64('https://firebasestorage.googleapis.com/v0/b/highkeystaff.appspot.com/o/Emails%2Flogolm-min.png?alt=media&token=7f1badc5-9f07-476c-82b0-7a16a3254ff0');
    await this.loadTimesheet();  
    return {
      content: [
        {
          image: logoBase64,
          width: 100,
          height: 70,
          absolutePosition: { x: 30, y: 10 },
        },
        {
          text: "(410) 922-6140\noperations@stafflm.com", // Combinamos teléfono y correo en un solo bloque de texto
          style: "header",
          fontSize: 9.5,
          alignment: "left",
          absolutePosition: { x: 35, y: 70 },
        },
        {
          text: `Order: ${this.dataEmployees.data.orderId}`,
          // text :"Order 1234", 
          style: "header",
          alignment: "right"
        },
        {
          text: `Timesheet`,
          bold: true,
          fontSize: 30,
          alignment: "center",
          margin: [0, 0, 0, 5],
        },
        {
          text: `Customer:${this.dataEmployees.data.company}`,
          // text: `Customer: algo`,
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 0, 0, 5],
        },
        {
          text: `${this.dataEmployees.data.place}`,
          // text: `place`,
          bold: true,
          fontSize: 15,
          alignment: "center",
          margin: [0, 0, 0, 5],
        },
        {
          text: `${this.dataEmployees.data.address} ${this.dataEmployees.data.city} ${this.dataEmployees.data.state} ${this.dataEmployees.data.zipcode}`,
          // text: `address city state zipcode}`,
          bold: true,
          fontSize: 13,
          alignment: "center",
          margin: [0, 0, 0, 5],
        },
        {
          text: `Date: ${this.dataEmployees.data.startDate}`,
          // text: `Date: startDate`,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },

        this.getEmployeesObject(this.employeesArray), 
        {
          // text: this.timeSheet.total !== 0 ? `Total hours: ${this.timeSheet.total}` : '',
          text: this.timeSheet.total > 0 ? `Total hours: ${this.timeSheet.total}` : '',
          margin: [380, 10, 0, 0], 
        },
        {
          text: "NOTE:",
            alignment: 'left',
          margin: [30, 30, 0, 0],   
        },
        {
          canvas: [
            {
              type: "rect",
              x: 10,
              y: 10,
              w: 400,
              h: 80,
            },
          ],
            alignment: 'left',
          margin: [30, 10, 0, 10],  
        },
        {
          text: "The time as shown on the Time-Sheet are correct and the work has been performed to our satisfaction. Employee certifies that this form is true and accurate and that no injuries were sustained during this assigment and will not solicit permanent, part time, independent contract with any of our clients.",
          fontSize: 10,    
           alignment: 'left',
          margin: [30, 10, 0, 10],    
        },           
       
        {
          text: `________________________\n Authorized Representative of Costumer\n ${this.dataEmployees.data.company}`,
          alignment: 'left',
          margin: [30, 10, 0, 10],   
        },
        {
          text: '________________\n Invoice',
          alignment: "right",
          margin: [0, 20, 0, 0],
        },
      ],
      footer: function (currentPage, pageCount) {
        return {
          margin: 10,
          columns: [
            {
              fontSize: 10,
              text: [
                {
                  text:
                    "--------------------------------------------------------------------------" +
                    "\n"+ 
                    "L&M Internacional"+
                    "\n",
                  margin: [0, 20],
                },
                {
                  text: `Your Staffing Solution: T:(410)922-6140, F:(410)922-6150, www.stafflm.com, Generated: ${generated}`
                },
                // {
                //   text: "© L&M " + currentPage.toString() + " of " + pageCount,
                // },
              ],
              alignment: "center",
            },
          ],
        };
      },
      info: {
        title: `Timesheet ${this.dataEmployees.data.company}_${this.dataEmployees.data.orderId}_${this.dataEmployees.data.startDate}`,
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: "underline",
        },
        name: {
          fontSize: 16,
          bold: true,
        },
        tableHeader: {
          bold: true,
        },
        signature: {
          margin: [20, 0, 0, 20],
        },
      },
    };
  }

  

  generatePdf() {
    this.groupEmployees = [];
    const positions = [];
    function convertTimestampToTime(timestamp: any): string {
    // Verifica si el timestamp es válido y no está vacío
      if (timestamp && timestamp._seconds && timestamp._nanoseconds !== undefined) {
        // Crea un objeto Date a partir del timestamp (suponiendo que el valor es en segundos)
        const date = new Date(timestamp._seconds * 1000);
        // Obtiene la hora, los minutos y el período (AM o PM)
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? "PM" : "AM";
        // Ajusta las horas en formato 12 horas y agrega ceros iniciales si es necesario
        const formattedHours = (hours % 12 === 0 ? 12 : hours % 12).toString().padStart(2, "0");
        // Ajusta los minutos y agrega ceros iniciales si es necesario
        const formattedMinutes = minutes.toString().padStart(2, "0");
        // Retorna la hora formateada con el período (AM o PM)
        return `${formattedHours}:${formattedMinutes} ${period}`;
      }
   // Si el timestamp no es válido, retorna una cadena vacía
    return "";
  }

    this.employeesArray.forEach((employee) => {
      const findedPosition = positions.find(
        (group) =>
          group.name == employee.position && group.hour == employee.hourFrom
      );
      if (!findedPosition) {
        let totalHours = 0;
        const positionsArray = this.employeesArray.filter(
          (emps) =>
            emps.position == employee.position &&
            emps.hourFrom == employee.hourFrom
        );
        // console.log("positios", positionsArray)
        positionsArray.forEach((position) => {
          totalHours += Number(position.hours);
        });
        positions.push({
          name: employee.position,
          hour: employee.hourFrom,
          total: totalHours,
        });
      }
    });
    positions.forEach((position) => {
      this.groupEmployees.push([
        {
          colSpan: 8,
          text: `${position.name} - ${position.hour} / Hours by position: ${position.total}`,
          style: "tableHeader",
        },
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
      ]);
      const employees = this.employeesArray.filter(
        (employee) =>
          employee.position == position.name &&
          employee.hourFrom == position.hour
      );
        // console.log("empl", employees)
        
      const emps = employees.map((emp, index) => {

        // console.log("emop", emp)
        let dateFrom, dateTo;
        if (emp.status == "No show") {
          dateFrom = "No show";
          emp.hours = 0;
          emp.break = "No show";
          dateTo = "No show";
        } else {  
          
          if (emp.checkin) {
            const formattedTime = convertTimestampToTime(emp.dateCheckin);
            // console.log("formattedFrom",formattedTime);
            dateFrom =formattedTime; 
            /* this.datePipe.transform(
              emp.dateCheckin.toDate(),
              "h:mm a"
            ); */
          } else {
            dateFrom = "-";
            emp.hours = "-";
            emp.break = "No checkout";
          }
          if (emp.checkout) {

            const formattedTime = convertTimestampToTime(emp.dateCheckout);
            // console.log("formattedTo",formattedTime);

            dateTo = formattedTime;
            /* this.datePipe.transform(
              emp.dateCheckout.toDate(),
              "h:mm a"
            ); */
          } else {
            dateTo = "-";
            emp.hours = "-";
            emp.break = "No checkout";
          }
        }

        return [
          index + 1,
          // emp.employee.data.lastname,
          emp.employee.data.lastname[0].toUpperCase() + emp.employee.data.lastname.substring(1).toLowerCase(),
          // emp.employee.data.firstname,
          emp.employee.data.firstname[0].toUpperCase() + emp.employee.data.firstname.substring(1).toLowerCase(),
          emp.employee.data.employeeId ? emp.employee.data.employeeId : "0",
          dateFrom,
          //dateFrom,
          emp.break,
          //dateTo,
          dateTo,
          emp.hours,
          //emp.position,
          // profile.username
        ];
      });
      
      emps.forEach((employee) => {
        this.groupEmployees.push(employee);
      });
    });
   

    const documentDefinition = this.getDocumentDefinition();
    
    documentDefinition.then((result) => {
      pdfMake.createPdf(result).open();
    });
    //
  }
  
  
  async addNewEmergencyEmployeeModal() {
    
    const dialogRef = this.dialog.open(FormDialogComponent)
    const result = await dialogRef.afterClosed().toPromise();
    console.log('RESULT--> ', result)

    if (result) {
      const previousEmployee = this.employeesArray[0];
      
      const addNewEmployee = {
        ...previousEmployee,
        //...this.employeesArray[0], //Acá se están tomando las propiedades del primer elemento como base del nuevo elemento del arreglo
        orderId: previousEmployee.orderId,
        firstName: result.firstName,
        lastName: result.lastName,
        mail: result.mail,
        phone: result.phone,
        updateUser: this.dataUser.email
      };
      Object.keys(addNewEmployee).forEach((key) => {
        if (key !== 'orderId' && key !== 'firstName' && key !== 'lastName' && key !== 'mail' && key !== 'phone' && key !== 'updateUser') {
          addNewEmployee[key] = '';
        }
      });
 
      this.employeesArray.push(addNewEmployee);
  
      console.log('employeesArray después de adicionar nuevo employee: ', this.employeesArray);
    }

/*
    const addNewEmployee = this.employeesArray.map((employee) => {
      return {
        ...employee,
        firstName: result.firstName,
        lastName: result.lastName,
        mail: result.mail,
        phone: result.phone,
        
        updateUser:this.dataUser.email
      };
      return employee;  
    });
  
    console.log('addEmployee: ',addNewEmployee)
    */


    //const dialogRef = this.dialog.open(AllActionsComponent);
      
      //const result = await dialogRef.afterClosed().toPromise();
      //console.log('Result => ', result);
      
      //const addEmployee = 

      /*
      const updatedEmployees = this.employeesArray.map((employee) => {
        
        if (
          selectedRows.some(
            (row) =>
            row.employee.data.employeeId === employee.employee.data.employeeId &&
            row.hourFrom === employee.hourFrom,
            )
            ){
              
                const roundedHours = this.calculateHoursWorkedAll(
                  employee,
                  checkInTimestamp,
                  dateCheckinRounded,
                  checkOutTimestamp,
                  dateCheckoutRounded,
                  
                );
              console.log('roundedHours: ',roundedHours)  
              console.log('result.break: ',result.break)  
              
              if(roundedHours==5){
                this.updatedHours = roundedHours 
              } else{
                this.updatedHours =  roundedHours - roundedBreak;
              }

              return {
                ...employee,
                checkin: true,
                checkout: true,
                break: result.break,
            
                updateUser:this.dataUser.email
              };
        //  }
        }
        return employee;
      });
      
  
      console.log("updatedEmployees ALLActionsModal: ", updatedEmployees);
  
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
          this.showNotification(
            'snackbar-success',
            'New emergency employee added successfully...!!!',
            'bottom',
            'center'
          );
          //console.log('Actualización exitosa:', data);
          this.getEmployees(); // Llamar a la función getEmployees() para actualizar la tabla
          this.removeSelectedRows() //Actualiza la tabla para que no duplique el dato en el anterior empleado.
        })
        .catch((error) => {
          console.error('Error al actualizar:', error);
        });
    } else {
      console.log('Ningún empleado seleccionado para check-in.');
    }
    */

    // PLANTILLA
   
    /*let tempDirection: Direction;
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
    
    const addEmployee = 

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
          'New emergency employee added successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
    */
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
    /*  this.showNotification(
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



/////////////////////////////////////////////////////////////////////////////////////////////////////




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
            )
              //employees.department +
              //employees.role +
              //employees.degree +
              //employees.email +
              //employees.mobile
              .toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.

        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
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
