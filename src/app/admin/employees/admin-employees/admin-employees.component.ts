import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { EmployeesService } from '../allEmployees/employees.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminEmployees } from './admin-employees.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
//import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil, TableElement } from '@shared';
import { DatePipe, formatDate } from '@angular/common';
import { OrderDataService } from 'app/_services/orderData.service';
import { delay } from 'rxjs/operators'; //Jairo
import { Timestamp } from 'firebase/firestore';
import { AuthenticationService } from 'app/_services/authentication.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend,
  ApexFill,
  ApexResponsive,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';
import { Position } from 'app/interfaces/position.interface';
import { CheckInAdminEmployeesComponent } from './dialogs/check-in-admin-employees/check-in-admin-employees.component';
import { CheckOutAdminEmployeesComponent } from './dialogs/check-out-admin-employees/check-out-admin-employees.component';
import { BreakAdminEmployeesComponent } from './dialogs/break-admin-employees/break-admin-employees.component';
import { GeolocationService } from 'app/_services/geolocation.service';
import { ShareScheduledTimeService } from 'app/_services/share-scheduled-time.service';
//import { HeaderComponent } from '../../../layout/header/header.component';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  series2: ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  labels: string[];
};
@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.scss'],
  providers: [DatePipe],
})
export class AdminEmployeesComponent 
extends UnsubscribeOnDestroyAdapter 
implements OnInit
{
  displayedColumns = [
    'select',
    //'lastName',
    //'firstName',
    //'highKeyID',
    //'payRollID',
    'position',
    'hourFrom',
    'in',
    'out',
    'break',
    'totalHours',
    //'uniform',
    //'department',
    //'role',
    //'degree',
    //'mobile',
    //'email',
    //'date',
    //'actions',
  ];
  exampleDatabase?: EmployeesService;
  selection = new SelectionModel<AdminEmployees>(true, []);
  index?: number;
  id?: number;
  employees?: AdminEmployees;
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
  employeeArray: any[] = [];
  totalHoursArray: number[] = [];
  totalHoursSum: number;
  //geolocationService: any;
  startDate: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  dataSource!: ExampleDataSource;
  HeaderComponent: any;
  latitude: number;
  longitude: number;
  
  

  constructor(
    private datePipe: DatePipe,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public employeesService: EmployeesService,
    private snackBar: MatSnackBar,
    private orderDataService: OrderDataService,
    public authenticationService: AuthenticationService,
    private geolocationService: GeolocationService,
    private shareScheduledTimeService : ShareScheduledTimeService,
    //private checkInService: CheckInService,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {
    super();
    // this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
  }
  
  //@Input() datosUsuario: any; // Trae los datos del usaurio desde el headerComponent
  
  ngOnInit() {
    
    this.dataEmployees = this.orderDataService.getSelectedOrder();
    console.log('Data Order: ', this.dataEmployees);
    this.orderId = this.dataEmployees.id;
    this.exactHourPayment = this.dataEmployees.data.exactHourPayment;
    this.startDate = this.dataEmployees.data.startDate;
    this.getEmployees();
    this.loadData();
    this.dataUser = this.authenticationService.getData(); //Persistencia de datos
    const storedUserData = sessionStorage.getItem('currentUserData');

    
    if (storedUserData) {
      this.dataUser = JSON.parse(storedUserData);
    } else {
      // Si no se encuentran los datos en el localStorage, obtenerlos del servicio
      this.dataUser = this.authenticationService.getData();
      // Almacenar los datos en el localStorage
      // localStorage.setItem('currentUserData', JSON.stringify(this.dataUser));
      sessionStorage.setItem('currentUserData', JSON.stringify(this.dataUser));
    }

    console.log('Datos traídos desde el header: ', this.dataUser)

    /*
     this.geolocationService.getCoordinatesObservable().subscribe((coordinates) => {
      this.latitude = coordinates.latitude;
      this.longitude = coordinates.longitude;      
    }, (error) => {
      console.error('Error al obtener la ubicación:', error);
    });
    */

    this.geolocationService.getCoordinatesObservable().subscribe(
      (coordinates) => {
        this.latitude = coordinates.latitude;
        this.longitude = coordinates.longitude;
        console.log("Coordenadas recibidas: ", coordinates);
      },
      (error) => {
        console.error("Error obteniendo las coordenadas: ", error);
      }
    );
  }
  
  // Función para controlar la visibilidad de los botones al hacer clic en el checkbox
   
  
  getEmployees() {
    //`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`
    fetch(`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`)
    // fetch(`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`)
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
          
          let hourFromFormatted = "No Data";
          if (employee.hourFrom) {
            const hourParts = employee.hourFrom.split(':');
            if (hourParts.length === 2) {
              const hours = parseInt(hourParts[0]);
              const minutes = parseInt(hourParts[1]);
          
              // Calcula el período (AM o PM)
              const period = hours >= 12 ? 'PM' : 'AM';
          
              // Convierte las horas al formato de 12 horas
              const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
              const formattedMinutes = minutes.toString().padStart(2, '0');
          
              // Formatea la hora en un string
              hourFromFormatted = `${formattedHours}:${formattedMinutes} ${period}`;
            }
          }  
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
            hourFromFormatted: hourFromFormatted,
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
        
        const hkId = this.dataUser.highkeyId;
        
        //validación de la propiedad highKeyId del empleado con el highkeyId del usuario
        this.employeeArray = this.employeesArray.filter((employee) => {
        console.log("hkId:",hkId)
        console.log("employee.highKeyId: ",employee.highKeyId)
          return employee.highKeyId === Number(hkId); // Usar hkId en lugar de this.dataUser.highkeyId
          });

      //console.log('employeeArray: ', this.employeeArray);
        
        this.dataSource = new ExampleDataSource(
          this.exampleDatabase,
          this.paginator,
          this.sort,
          this.employeeArray //muestra la info de la orden según empleado en el listado.
        );
        
                //SUMANDO LOS TOTALES DE LAS HORAS TRABAJADAS

        this.totalHoursArray = [];
        //creando el arreglo y llenándolo con los valores de la propiedad hours de amployeeArray
        console.log('ARRAY EmployeeArray: ',this.employeeArray)
        for (const item of this.employeeArray) {
          this.totalHoursArray.push(item.hours);
        }
       // console.log('Horas ARRAY: ', this.totalHoursArray)
        
        //convirtiendo los valores de totalHoursArray a tipo number
        const numberArray = this.totalHoursArray.map((stringValue) => {
          return Number(stringValue);
        });
        
        //Sumando los valores del arreglo
        this.totalHoursSum = numberArray.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        
       // console.log('Suma Total Horas: ', this.totalHoursSum);
        
        
      })
      .catch((error) => {
        console.log(error);
        this.isTblLoading = false;
      });
  }

  onCheckboxClick(row: AdminEmployees) {
    
    // console.log('dateCheckin antes IF: ', row.dateCheckin) 
    const dateStart = new Date(`${this.startDate}T${row.hourFrom}`);   
    console.log("gdateStart", dateStart)       
    this.shareScheduledTimeService.setScheduleDate(dateStart);
    if ((row.dateCheckin === null || row.dateCheckin === undefined)&&(row.dateCheckout === null || row.dateCheckout === undefined)) {
      console.log('dateCheckin', row.dateCheckin) 
      this.showCheckInButton = true;
      this.showCheckOutButton = false;
      this.showBreakButton = false;
      this.showNoShowButton = true;
      //console.log('Si no hay checkIN: ')
      //console.log('CheckIn button: ',this.showCheckInButton)
      //console.log('NoShow button: ',this.showNoShowButton)
      //console.log('CheckOut button: ',this.showCheckOutButton )
      //console.log('---------------------------------')
    }
    else if((row.dateCheckin !== null || row.dateCheckin !== undefined)&&(row.dateCheckout === null || row.dateCheckout === undefined)) {
      this.showCheckInButton = false;
      this.showCheckOutButton = true;
      this.showBreakButton = true;
      this.showNoShowButton = false;
      //console.log('Si hay checkIN y no hay checkOut: ')
      //console.log('CheckOut button: ',this.showCheckOutButton )
      //console.log('Break button: ',this.showBreakButton )
      //console.log('---------------------------------')
    }  
    else if ((row.dateCheckout !== null || row.dateCheckout !== undefined)&&(row.break === null || row.break === undefined || row.break === "0")){
      this.showCheckInButton = false;
      this.showCheckOutButton = false;
      this.showBreakButton = true;
      this.showNoShowButton = false;
      //console.log('Si hay checkIN y hay checkOut: ')
      //console.log('Break button: ',this.showBreakButton )
      //console.log('---------------------------------')
    }
    else {
      this.showCheckInButton = false;
      this.showCheckOutButton = false;
      this.showBreakButton = false;
      this.showNoShowButton = false;
      //console.log('Si hay checkIN, checkOut y Break: Botones no visibles')
      //console.log('---------------------------------')
    }
    this.scrollToButtons()  
  } 
  scrollToButtons() {
    const buttonsSection = this.el.nativeElement.querySelector('#buttonsSection'); // Replace 'buttonsSection' with the actual element ID you want to scroll to
    if (buttonsSection) {
      buttonsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

//Borra checkIn, CheckOut y break.
  deleteInTime(selectedRows: AdminEmployees[]) {
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
            realInTime: 'No Data',
            totalHours:0,
            checkinCoordinates:{
              latitude: '-',
              longitude: '-',
            },
            checkOutCoordinates:{
              latitudeOut: '-',
              longitudeOut: '-',
            },
          };
        }
        return employee;
      });

      console.log('updatedEmployees', updatedEmployees);

      const apiUrl = 
      // `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      //  `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`; 
       `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
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

  getSelectedRow(): AdminEmployees | null {
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
  getSelectedRows(): AdminEmployees[] {
    return this.selection.selected;
  }

  formatTwoDigits(value: number): string {
    return String(value).padStart(2, '0');
  }

  async checkInModal(selectedRows: AdminEmployees[]) {
    if (selectedRows.length > 0) {
      console.log('Empleados seleccionados para check-in:', selectedRows);
      
      const dialogRef = this.dialog.open(CheckInAdminEmployeesComponent, {
        
        data: {
          employees: this.employees,
          action: 'add',
        },
        
      });

      const result = await dialogRef.afterClosed().toPromise();

      const timestamp = Timestamp.fromDate(new Date(result.startDate));
      //console.log('TimeStamp: ', timestamp);
      const checkInTimestamp = timestamp?.seconds || 0;
      const  rounded = this.roundDate(result.startDate);
      const timestampCheckinRounded= Timestamp.fromDate(new Date(rounded));
      const dateCheckinRounded = timestampCheckinRounded?.seconds || 0;
      
      try {
        const coordinates = await this.getCoordinates();
        this.latitude = coordinates.latitude;
        this.longitude = coordinates.longitude;
      } catch (error) {
        console.error("Error obteniendo las coordenadas: ", error);
      }
      
      //console.log("Latitud CheckIn Modal", this.latitude)
      //console.log("Longitud CheckInModal", this.longitude)
      
      // Filtrar y actualizar solo el empleado que hizo el check-in con sus datos actualizados
      const updatedEmployees = this.employeesArray.map((employee) => {
        
        if (selectedRows.some((row) =>row.employee.data.employeeId === employee.employee.data.employeeId && 
            row.hourFrom === employee.hourFrom,
            //console.log('row.employee.data: ',row.employee.data),
            //console.log('employee.employee.data',employee.hourFrom),
            
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
            checkinCoordinates: {
              latitude: this.latitude,
              longitude: this.longitude,
            },
            // realInTime = fecha resultado del checkin despues de validar con schedule time
            realInTime: result.actualTime,
            
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
  
      const apiUrl = 
      `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`
      // `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
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

  getCoordinates(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      this.geolocationService.getCoordinatesObservable().subscribe(
        (coordinates) => {
          resolve(coordinates);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  roundDate1(date: Date) {
    // eslint-disable-next-line prefer-const
    let roundedDate = date;
    roundedDate.setSeconds(0, 0);
    // eslint-disable-next-line prefer-const
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
      // En caso de que 'date' no sea una instancia válida de Date, maneja el error aquí
      // console.error('La variable "date" no es una instancia válida de Date.', date);
      return null; // O devuelve un valor predeterminado o maneja el error de otra manera
    }
  }
  roundDate(date: Date) {
    // Verificar si 'date' es una instancia válida de Date
    if (date instanceof Date && !isNaN(date.getTime())) {
      // eslint-disable-next-line prefer-const
      let roundedDate = new Date(date); // Crear una copia de 'date'
      roundedDate.setSeconds(0, 0);
      // eslint-disable-next-line prefer-const
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
    } else {
      // En caso de que 'date' no sea una instancia válida de Date, maneja el error aquí
      // console.error('La variable "date" no es una instancia válida de Date.', date);
      return null; // O devuelve un valor predeterminado o maneja el error de otra manera
    }
  }
  

  roundHours(hour: number) {
    let decimal = hour - Math.floor(hour);
    // eslint-disable-next-line prefer-const
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
    // eslint-disable-next-line prefer-const
    let fixed = trunc + decimal;
    return fixed;
  }

  async checkOutModal(selectedRows: AdminEmployees[]) {
    if (selectedRows.length > 0) {
      // console.log('Empleados seleccionados para check-out:', selectedRows);
      const dialogRef = this.dialog.open(CheckOutAdminEmployeesComponent, {
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
      
      try {
        const coordinates = await this.getCoordinates();
        this.latitude = coordinates.latitude;
        this.longitude = coordinates.longitude;
      } catch (error) {
        console.error("Error obteniendo las coordenadas: ", error);
      }
      
      //console.log("Latitud Checkout Modal", this.latitude)
      //console.log("Longitud Chackout Modal", this.longitude)

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
            checkOutCoordinates:{
              latitudeOut: this.latitude,
              longitudeOut: this.longitude,
            },
            

            updateUser:this.dataUser.email,
            status: 'Checked Out',
            hours: roundedHours.toFixed(2),
            break: 0,

          };
          
        }
        return employee;
      });

      console.log('updatedEmployees', updatedEmployees);

      const apiUrl =
      //  `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
        // `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`; 
        `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
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

  calculateHoursWorked(
    employee: AdminEmployees,
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

        // eslint-disable-next-line prefer-const
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
// console.log(checkinDate)
// console.log(hourLimit.getTime() )
const dateStart = new Date(`${this.startDate}T${hourFrom}`);
// console.log(dateStart.getTime())   
if (checkinDate.getTime() > dateStart.getTime()){ 
    // if (checkinDate.getTime() > hourLimit.getTime()) {
      const diff = Math.abs(checkinDate.getTime() - hourLimit.getTime());
      const minutes = Math.floor(diff / 60000);
      return minutes;
    }

    return 0;
  }

  calculateRegularHours(employee: AdminEmployees, dateCheckoutRounded: number) {
   
    const checkinTime = new Date(employee.dateCheckinRounded._seconds * 1000);
    // console.log("checkinTime", checkinTime);
    // console.log("checkOutTimestamp", dateCheckoutRounded);
    const checkOutTime = new Date(dateCheckoutRounded * 1000);
    // console.log("checkOutTime", checkOutTime);

    const hours = (checkOutTime.getTime() - checkinTime.getTime()) / 3600000;
    return Number(hours.toFixed(2));
  }

  calculateExactHourPayment(employee: AdminEmployees, checkOutTimestamp: number) {
    const checkInTime = employee.dateCheckin._seconds;
    const checkOutTime = checkOutTimestamp;

    const secondsWorked = checkOutTime - checkInTime;
    const hoursWorked = secondsWorked / 3600;

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

  async breakModal(selectedRows: AdminEmployees[]) {
    if (selectedRows.length > 0) {
      console.log('Empleados seleccionados para break:', selectedRows);
      const dialogRef = this.dialog.open(BreakAdminEmployeesComponent, {
        data: {
          employees: this.employees,
          action: 'add',
        },
      });

      const result = await dialogRef.afterClosed().toPromise();
      console.log('Result break: ', result);
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
          const updatedHours = employee.hours - roundedBreak;
          return {
            ...employee,
            updateUser:this.dataUser.email,
            break: result.break,
            hours: updatedHours.toFixed(2),
          };
        }
        return employee;
      });

      console.log('updatedEmployees', updatedEmployees);
  
      const apiUrl = 
      // `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      //  `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
       `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
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
      this.selection = new SelectionModel<AdminEmployees>(true, []);
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
  
}




export class ExampleDataSource extends DataSource<AdminEmployees> {
  data: any[];
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AdminEmployees[] = [];
  renderedData: AdminEmployees[] = [];
  constructor(
    public exampleDatabase: EmployeesService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public employeesArray: any[]
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    // Establece la columna 'hourFrom' como la columna activa para el ordenamiento predeterminado.
    this._sort.active = 'hourFrom';
    this._sort.direction = 'asc'; // Orden ascendente
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AdminEmployees[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    // this.exampleDatabase.getAllEmployeess();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.employeesArray
          .slice()
          .filter((employees: AdminEmployees) => {
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
  sortData(data: AdminEmployees[]): AdminEmployees[] {
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
      
   

  

