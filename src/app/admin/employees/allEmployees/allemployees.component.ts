import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
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
import { BehaviorSubject, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Direction } from '@angular/cdk/bidi';
import { DatePipe} from '@angular/common';
import { OrderDataService } from 'app/_services/orderData.service';
import { CheckInComponent } from './dialogs/check-in/check-in.component';
import { CheckOutComponent } from './dialogs/check-out/check-out.component';
import { BreakComponent } from './dialogs/break/break.component';
import { AddExistingEmployeeComponent } from './dialogs/add-existing-employee/add-existing-employee.component';
import { AllActionsComponent } from './dialogs/all-actions/all-actions.component';
import { Timestamp } from 'firebase/firestore';
import { AuthenticationService } from 'app/_services/authentication.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ActivatedRoute } from '@angular/router';
import { SharingCloseOrderService } from 'app/_services/sharing-close-order.service';
import { ShareStartDateService } from '../../../_services/share-start-date.service';
import { ShareTimeDifferenceInMinutesService } from 'app/_services/share-time-difference-in-minutes.service';

import * as L from 'leaflet';
import {Map, marker, tileLayer, Marker} from 'leaflet';

//import 'leaflet/dist/leaflet.css';

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
    'status',
    'map',
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
  updatedHours: number;
  highKeyid: number;
  public statusOrder!: string;
  public ShowButtons = true;
  selectedRowsWithoutNoShow: Employees[] = [];
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  dataSource!: ExampleDataSource;
  positions = [];
  startDate: any;
  updateRegistrationCalled: boolean;
  latitudeEvent: number;
  longitudeEvent: number;
  selected_Rows: any[] = []; // Nueva propiedad para almacenar las selecciones
  // updateRegistrationCalled: boolean;
  

  constructor(
    private datePipe: DatePipe,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public employeesService: EmployeesService,
    private snackBar: MatSnackBar,
    private orderDataService: OrderDataService,
    public authenticationService: AuthenticationService,
    //private checkInService: CheckInService,
    private route: ActivatedRoute,
    private sharingCloseOrderService: SharingCloseOrderService,
    private shareStartDateService: ShareStartDateService,
    private shareTimeDifferenceInMinutesService: ShareTimeDifferenceInMinutesService,
  ) {
    super();
    this.updateRegistrationCalled = false;
    // this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    this.updateRegistrationCalled = false;
  }

  ngOnInit() {
    this.dataEmployees = this.orderDataService.getSelectedOrder();
    this.statusOrder = this.dataEmployees.data.status;  
    this.orderId = this.dataEmployees.id;
    console.log('orderId:',this.orderId)
    this.orderDataService.getSelectedOrderObservable().subscribe((selectedOrder) => {
      console.log('Activa el subscribe en allEmployees')
      if (selectedOrder) {
        this.dataEmployees = selectedOrder;
        this.statusOrder = this.dataEmployees.data.status;  
        this.orderId = this.dataEmployees.id;  
        
        if(this.statusOrder === 'closed'){
          this.ShowButtons = false
         }else{
          this.ShowButtons = true
         }
      }
    });
    console.log('Data Order: ', this.dataEmployees);
    
    this.startDate = this.dataEmployees.data.startDate;

    console.log('Data StatusOrder: ', this.statusOrder);
    
    this.exactHourPayment = this.dataEmployees.data.exactHourPayment;
    this.getEmployees();
    this.loadData();
    this.dataUser = this.authenticationService.getData();
    
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
        //console.log('FormData en AllEmployees:', params);
      }
    });
    
    //this.sharingCloseOrderService.setStatusOrder(this.statusOrder);
  
    //Oculta todos los botones de la tabla si la orden es cerrada.
    if(this.statusOrder === 'closed'){
      this.ShowButtons = false
     }
   
    this.getEventLocation()
   
    
  }
  
  getTimeDifference() {
    return this.shareTimeDifferenceInMinutesService.getTimeDifference();
  }
  /*
  getCssClasses(row) {
    const timeDifference = this.getTimeDifference(row);
    return {
      'highlighted-row': timeDifference < 20,
      'normal-row': timeDifference >= 20,
    };
  }
  */
  

  // Función para verificar la visibilidad de los botones al hacer clic en el checkbox
  onCheckboxClick(row: Employees) {
    // console.log('dateCheckin antes IF: ', row.dateCheckin) 
    if ((row.dateCheckin === null || row.dateCheckin === undefined)&&(row.dateCheckout === null || row.dateCheckout === undefined)) {
      // console.log('dateCheckin', row.dateCheckin) 
      this.showCheckInButton = true;
      this.showCheckOutButton = false;
      this.showBreakButton = false;
      this.showNoShowButton = true;
    }
    else if((row.dateCheckin !== null || row.dateCheckin !== undefined)&&(row.dateCheckout === null || row.dateCheckout === undefined)) {
      this.showCheckInButton = false;
      this.showCheckOutButton = true;
      this.showBreakButton = true;
      this.showNoShowButton = false;
    }  
    else if ((row.dateCheckout !== null || row.dateCheckout !== undefined)&&(row.break === null || row.break === undefined || row.break === "0")){
      this.showCheckInButton = false;
      this.showCheckOutButton = false;
      this.showBreakButton = true;
      this.showNoShowButton = false;
    }
    else {
      this.showCheckInButton = false;
      this.showCheckOutButton = false;
      this.showBreakButton = false;
      this.showNoShowButton = false;
    }
  }  
  
  getEmployees() {
    //`http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`
    //`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`
    fetch(`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`)
      .then((response) => response.json())
      .then((data) => {
        this.isTblLoading = false;
        console.log("datadelRegistro: ", data);
  
        this.employeesArray = data.employees.map((employee) => {
          // const employeeData = { ...employee.employee.data };
          const employeeData = employee.employee ? { ...employee.employee.data } : {};
          
          if (
            employeeData.firstname &&
            employeeData.lastname &&
            employeeData.employeeId 
          ) {
          console.log('Arreglo de empleados: ',employee)
          const firstName = employeeData.firstname || "No data";
          // console.log('dlnempleado: ',employee)
          const lastName = employeeData.lastname
          const highKeyId = employeeData.employeeId ;
          const position = employee.position || "No data";
          const totalHours = employee.hours || "No data";
          const payrollId = employeeData.payrollid || "No data";
          const brake = employee.break || "0";
          const hourFrom = employee.hourFrom || "No data";
          //console.log('STARTDATE: ',this.startDate)
          //console.log('hourFrom: ', hourFrom)
  
          const dateStart = new Date(`${this.startDate}T${hourFrom}`);
          //console.log("dateStart", dateStart)
    
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
            //console.log('hourFromFormatted: ',hourFromFormatted)
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
            dateStart: dateStart,
          };
        } else {
          // Algunos campos requeridos faltan, no crear el objeto empleado
          // console.log('Empleado no cumple con los requisitos:', employee);
          return null;
        }
        }).filter((employee) => employee !== null); // Filtrar elementos nulos
        
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
          
        /* if(this.statusOrder != "closed"){         
          this.updateRegistration()
        } */
        /* if (this.statusOrder != "closed" && !this.updateRegistrationCalled) {
          this.updateRegistration();
          this.updateRegistrationCalled = true; // Marca que la función se ha llamado
        } */
       /*  this.totalHoursArray = [];
        for (const item of this.employeesArray) {
          this.totalHoursArray.push(item.hours);
        } */
        if (this.statusOrder != "closed" && !this.updateRegistrationCalled) {
          this.updateRegistration();
          this.updateRegistrationCalled = true; // Marca que la función se ha llamado
        }
        this.totalHoursArray = [];
        for (const item of this.employeesArray) {
          if (item && item.hours !== null) { 
            this.totalHoursArray.push(item.hours);
          }
        }

        const numberArray = this.totalHoursArray.map((stringValue) => {
          return Number(stringValue);
        });
       this.totalHoursSum = numberArray.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        // Redondear totalHoursSum a dos decimales
        this.totalHoursSum = Number(this.totalHoursSum.toFixed(2));
       

      })
      .catch((error) => {
        console.log(error);
        this.isTblLoading = false;
      });
  }
  
  async updateRegistration() {
    const employeesArray = this.employeesArray;
    const items = this.dataEmployees.data.items;
    const startDate = this.dataEmployees.data.startDate
  
    if (employeesArray.length === 0) {
      // Si employeesArray está vacío, agrega todos los empleados directamente.
      items.forEach(item => {
        const hourFrom = item.hourFrom;
        const employees = item.employees;
        const position =  item.position;
        employees.forEach(employee => {
          // let id = employee.id
          // employeesArray.push({ ...employee, hourFrom }); // Mantén la misma estructura.
          if (employee.status !== "Rejected") {
          if (employee.status !== "Rejected") {
           let hourFromFormatted = "No Data";
           
           if (hourFrom) {
            const hourParts = hourFrom.split(':');
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
          const addEmployeeRegist = {
              hours: 0,
              hourFrom: hourFrom,
              hourFromFormatted:hourFromFormatted,              
              orderId: this.orderId,
              position: position,
              dateStart: new Date(`${startDate}T${hourFrom}`),
              break : 0,
              employee: {
                  ...employee
                  // agmRate: result.rate,
                  // booking: "Emergency",
                  // data: {
                      // ...result,
                  // },
                  // rate: result.rate,
                  // id: result.id,
                  // favourite: "Emergency",
                  // status: "Confirmed"
              },
              firstName: employee.data.firstname,
              highKeyId: employee.data.employeeId,
              lastName: employee.data.lastname,
              payRollId: employee.data.payrollid || 'No Data',
            }; 
          
          this.employeesArray.push(addEmployeeRegist);  
          }        
          // this.employeesArray.push(addEmployeeRegist);  
          }        
        });
      });
    } else {
      // Si employeesArray no está vacío, aplica la lógica de actualización.
      items.forEach(item => {
        
        const hourFrom = item.hourFrom;
        const employees = item.employees;
        const position =  item.position;
  
        employees.forEach(employee => {
          const employeeId = employee.data.employeeId;
          // console.log("aux",employee.status)
          // : "Rejected" 
          if (employee.status !== "Rejected") {
            const existingEmployeeIndex = employeesArray.findIndex(existingEmployee => {
              // console.log("xexistingEmployee", existingEmployee.employee.data)
              const condition = existingEmployee.employee.data.employeeId === employeeId && existingEmployee.hourFrom === hourFrom 
              // && employee.status !== "Rejected";
              return condition;
            });
    
            if (existingEmployeeIndex === -1) {
              // No se encontró un empleado con el mismo "employeeId" y "hourFrom" en employeesArray, agregarlo.            
                // employeesArray.push({ ...employee, hourFrom }); // Mantén la misma estructura.
                let hourFromFormatted = "No Data";
                if (hourFrom) {
                  const hourParts = hourFrom.split(':');
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
                const addEmployeeRegist = {
                  hours: 0,
                  hourFrom: hourFrom,
                  hourFromFormatted:hourFromFormatted,              
                  orderId: this.orderId,
                  position: position,
                  dateStart: new Date(`${startDate}T${hourFrom}`),
                  break : 0,
                  employee: {
                      ...employee
                      // agmRate: result.rate,
                      // booking: "Emergency",
                      // data: {
                          // ...result,
                      // },
                      // rate: result.rate,
                      // id: result.id,
                      // favourite: "Emergency",
                      // status: "Confirmed"
                  },
                  firstName: employee.data.firstname,
                  highKeyId: employee.data.employeeId,
                  lastName: employee.data.lastname,
                  payRollId: employee.data.payrollid || 'No Data',
                }; 
              
              this.employeesArray.push(addEmployeeRegist); 
            }
          }
        });
      }); 
    }
     const employeeDataArray = [];
     items.forEach((item) => {
       const hourFrom = item.hourFrom;
       item.employees.forEach((employee) => {
         const employeeData = { ...employee.data, hourFrom };
         employeeDataArray.push(employeeData);
       });
     });
     this.employeesArray = this.employeesArray.filter((employee) => {
       const highKeyId = employee.highKeyId;
       const hourFrom = employee.hourFrom;
       const employeeExistsInDataArray = employeeDataArray.some(
         (dataEmployee) =>
           dataEmployee.employeeId === highKeyId &&
           dataEmployee.hourFrom === hourFrom &&
           employee.status !== "Rejected"
       );
       return employeeExistsInDataArray;
     });
     console.log(
       'Contenido de employeesArray después de agregar empleados únicos:'
     );
     //const apiUrl = `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
     const apiUrl = `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
     console.log('modific', this.employeesArray);
     const response = await fetch(apiUrl, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ employees: this.employeesArray }),
     });
     // console.log(response)
     if (!response.ok) {
       throw new Error('Failed to update employees array.');
     }
  }

  
  // Reset checkin, checkout y break
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

      // console.log('updatedEmployees', updatedEmployees);

      const apiUrl =
      //  `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
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

      // console.log('updatedEmployees', updatedEmployees);

      const apiUrl =
      `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      // `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`; //`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
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
      // console.log('Objetos seleccionados:', selectedRows);
    } else {
      // console.log('Ningún objeto seleccionado.');
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
      const dateStartData = selectedRows.map((row) => row.dateStart);
      //console.log('dateStartData: ', dateStartData);
      this.shareStartDateService.setDateStartData(dateStartData)

      const dialogRef = this.dialog.open(AllActionsComponent)

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
              
              console.log("empleado Exac", employee);
          let roundedHours = 0;
          if(employee.empExactHours){
            console.log("empleado marcado")
            roundedHours = this.calculateRegularHoursAll(
              dateCheckinRounded,
              dateCheckoutRounded
            );
            this.updatedHours =  roundedHours - roundedBreak; 
          }else{
            roundedHours = this.calculateHoursWorkedAll(
              employee,
              checkInTimestamp,
              dateCheckinRounded,
              checkOutTimestamp,
              dateCheckoutRounded,
              
            );          

            const dateCheckin = new Date( dateCheckinRounded * 1000);
            const late = this.validateCheckout1(employee.hourFrom, dateCheckin);
            if (late < 8 && roundedHours==5) {
            this.updatedHours = roundedHours
            }else{
            this.updatedHours =  Number(roundedHours) - roundedBreak;
          }
          
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
  
      // console.log("updatedEmployees ALLActionsModal: ", updatedEmployees);
  
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
      // console.log('Ningún empleado seleccionado para check-in.');
    }
  }

  async checkInModal(selectedRows: Employees[]) {
    if (selectedRows.length > 0) {
      // console.log('Empleados seleccionados para check-in:', selectedRows);
      const dialogRef = this.dialog.open(CheckInComponent, {
        data: {
          employees: this.employees,
          action: 'add',
        },
      });
      const dateStartData = selectedRows.map((row) => row.dateStart);
      //console.log('dateStartData: ', dateStartData);
      this.shareStartDateService.setDateStartData(dateStartData)
      
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
              this.isTblLoading= true;
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
  
      // console.log("updatedEmployees: ", updatedEmployees);
  
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
          this.isTblLoading= false;
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
          this.isTblLoading= false;
          console.error('Error al actualizar:', error);
        });
    } else {
      // console.log('Ningún empleado seleccionado para check-in.');
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
      const dateStartData = selectedRows.map((row) => row.dateStart);
      //console.log('dateStartData: ', dateStartData);
      this.shareStartDateService.setDateStartData(dateStartData)

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
          console.log("empleado Exac", employee);
          let roundedHours = 0;
          if(employee.empExactHours){
            console.log("empleado marcado")
            roundedHours = this.calculateRegularHours(
              employee,
              dateCheckoutRounded
            );
            // roundedHours=10.5;
          }else{
            roundedHours = this.calculateHoursWorked(
              employee,
              checkOutTimestamp,
              dateCheckoutRounded
            );
          }
           
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

      const apiUrl =
      `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      // `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`; //`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
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

  async markEmpWorkHours(selectedRows: Employees[]){
    if (selectedRows.length > 0) {
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
            // empExactHours: true,
            empExactHours: !employee.empExactHours,
            updateUser:this.dataUser.email,
          };
        }
        return employee;
      });

      console.log(" updatedEmployees",  updatedEmployees)
     
      const apiUrl =
      `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      // `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`; 
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
            'Employee marked successfully...!!!',
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

  calculateHoursWorked(employee: Employees, checkOutTimestamp: number, dateCheckoutRounded: number ): number {
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

      //  console.log("Jr checkInTime", checkInTime)
      //  console.log("Jr checkOutTime", checkOutTime)
      const secondsWorked = checkOutTime - checkInTime;
      const hoursWorked = secondsWorked / 3600; //3600000
      // console.log("oursWorked", hoursWorked)
      let hoursNumber = this.roundHours(hoursWorked);

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
  }

  async breakModal(selectedRows: Employees[]) {
    // Deseleccionar a los empleados previamente seleccionados
    this.employeesArray.forEach((employee) => {
      employee.selected = false;
    });
  
    if (selectedRows.length > 0) {
      console.log('Empleados seleccionados para break:', selectedRows);
      const dialogRef = this.dialog.open(BreakComponent, {
        data: {
          employees: this.employees,
          action: 'add',
        },
      });
  
      const result = await dialogRef.afterClosed().toPromise();
      const roundedBreak = this.roundHours(result.break / 60);
  
      const updatedEmployees = this.employeesArray.map((employee) => {
        if (
          selectedRows.some(
            (row) =>
              row.employee.data.employeeId === employee.employee.data.employeeId &&
              row.hourFrom === employee.hourFrom &&
              (employee.dateCheckout !== null && employee.dateCheckout !== undefined)
          )
        ) {
          
          console.log('Empleados B: ',employee)
          const roundedHours = employee.empExactHours
          ? this.calculateRegularHours(employee, employee.dateCheckoutRounded._seconds)
          : this.calculateHoursWorked(employee, employee.dateCheckout._seconds, employee.dateCheckoutRounded._seconds);
          const totalHours = roundedHours.toFixed(2);
          console.log("luntotalHoursRounded: ", employee.dateCheckoutRounded)
          console.log("luntotalHours", totalHours)
          
          const dateCheckin = new Date( employee.dateCheckin._seconds * 1000);
          const late = this.validateCheckout1(employee.hourFrom, dateCheckin);
          if (late < 8 && employee.hours==5) {
            this.updatedHours = employee.hours
          }else{
            this.updatedHours =  Number(totalHours) - roundedBreak;
          }
          
  
          return {
            ...employee,
            updateUser: this.dataUser.email,
            break: result.break,
            hours: this.updatedHours,
          };
        }
        return employee;
      });
  
      const apiUrl = `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
  
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
          this.getEmployees();
          this.removeSelectedRows();
        })
        .catch((error) => {
          console.error('Error al actualizar:', error);
        });
    } else {
      // console.log 'Ningún empleado seleccionado para break.'
    }
  }
  
/*
  async breakModal(selectedRows: Employees[]) {
    // Deseleccionar a los empleados previamente seleccionados
    this.employeesArray.forEach((employee) => {
      employee.selected = false;
    });

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
              row.hourFrom === employee.hourFrom && employee.dateCheckout != null || employee.dateCheckout != undefined// Verifica si dateCheckout no es null
          )
        ) {
          // Restar el tiempo de descanso del total de horas trabajadas
          // const updatedHours = employee.hours - breakInHours;
          // console.log('employee.hours :',employee.hours)
          // console.log('roundedBreak :',roundedBreak)

          console.log('Empleados B: ',employee)
          const roundedHours = employee.empExactHours
          ? this.calculateRegularHours(employee, employee.dateCheckoutRounded._seconds)
          : this.calculateHoursWorked(employee, employee.dateCheckout._seconds, employee.dateCheckoutRounded._seconds);
          const totalHours = roundedHours.toFixed(2);
          console.log("luntotalHoursRounded: ", employee.dateCheckoutRounded)
          // console.log("luntotalHours", totalHours)
          const dateCheckin = new Date( employee.dateCheckin._seconds * 1000);
          const late = this.validateCheckout1(employee.hourFrom, dateCheckin);
          if (late < 8 && employee.hours==5) {
            this.updatedHours = employee.hours
          }else{
            this.updatedHours =  Number(totalHours) - roundedBreak;
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

      // console.log('updatedEmployees', updatedEmployees);
  
      const apiUrl =
      `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
      // `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`; //`https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
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
 */
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
  //filtro para no incluir los empleados que tienen estado No show
  const employeesToShow = this.employeesArray.filter(emp => emp.status !== "No show");
  employeesToShow.forEach((employee) => {
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
      const employees = employeesToShow.filter(
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
  
 
  addHours(numOfHours, date = new Date()) {
    // console.log("adhours", numOfHours, "date", date)
    const defaultHours = 5;
    
    if (typeof numOfHours !== 'number' || numOfHours === 0) {
      numOfHours = defaultHours;
    }
    
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    // console.log("date1", date)
    return date;
}

async verifyConcurrency(empleado, horaInicio, duracionHoras, startDate) {
  const apiUrl = 
  `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByStartDate?date=${startDate}`;
  //`http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByStartDate?date=${startDate}`;
  // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByStartDate?date=${startDate}`;
    const response = await fetch(apiUrl);
    const ordenes = await response.json();
    console.log("horaInicio", horaInicio)
    console.log("duracionHoras", duracionHoras)
    console.log("startDate", startDate)
    const dateStart = new Date(`${startDate}T${horaInicio}`);
    console.log("dateStart", dateStart)
    const dateEnd = this.addHours(duracionHoras, dateStart);
    console.log("dateEnd", dateEnd)
    for (const orden of ordenes) {
        const ordenItems = orden.data.items;
        for (const item of ordenItems) {
            const empleados = item.employees;
            if (empleados) {             
            // const empleadoEnOrden = empleados.find(emp => emp.id === empleado.id);
            const empleadoEnOrden = empleados.find(emp => (emp.id ? emp.id === empleado.id : emp.data.employeeId === empleado.employeeId));

            if (empleadoEnOrden) {
                const fechaInicioOrden = new Date(`${orden.data.startDate}T${horaInicio}`);
                const duracionHorasOrden = item.hours;
                const fechaFinOrden = this.addHours(duracionHorasOrden, fechaInicioOrden);

                const horaInicioStr = horaInicio; //item.hourFrom;
                const [horas, minutos] = horaInicioStr.split(':');                
                const [year, month, day] = orden.data.startDate.split('-');
                const fechaInicioOrden1 = new Date(year, month - 1, day, 0, 0, 0); // Restamos 1 al mes porque en JavaScript los meses van de 0 a 11
                fechaInicioOrden1.setHours(Number(horas), Number(minutos), 0, 0); // Ajustar la hora y los minutos

                console.log("fechaInicioOrden1", fechaInicioOrden1);
                
                console.log("fechaInicioOrden", fechaInicioOrden);
                console.log("duracionHorasOrden", duracionHorasOrden);
                console.log("fechaFinOrden", fechaFinOrden);
                if (
                    (dateStart >= fechaInicioOrden1 && dateStart < fechaFinOrden) || // Verificar conflicto con hora de inicio
                    (dateEnd > fechaInicioOrden1 && dateEnd <= fechaFinOrden)         // Verificar conflicto con hora de finalización
                ) {
                    return true; // Hay conflicto de horario
                }
            }
          }
        }
    }

    return false; // No hay conflicto de horario
  }
/*
async verifyConcurrency(empleado, horaInicio, duracionHoras, startDate) {
  const apiUrl = 
  `https://us-central1-highkeystaff.cloudfunctions.net/orders/getOrdersByStartDate?date=${startDate}`;
  // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByStartDate?date=${startDate}`;
  // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/getOrdersByStartDate?date=${startDate}`;
    const response = await fetch(apiUrl);
    const ordenes = await response.json();
    console.log("horaInicio", horaInicio)
    console.log("duracionHoras", duracionHoras)
    console.log("startDate", startDate)
    const dateStart = new Date(`${startDate}T${horaInicio}`);
    console.log("dateStart", dateStart)
    const dateEnd = this.addHours(duracionHoras, dateStart);
    console.log("dateEnd", dateEnd)
    for (const orden of ordenes) {
        const ordenItems = orden.data.items;
        for (const item of ordenItems) {
            const empleados = item.employees;
            if (empleados) {             
            // const empleadoEnOrden = empleados.find(emp => emp.id === empleado.id);
            const empleadoEnOrden = empleados.find(emp => (emp.id ? emp.id === empleado.id : emp.data.employeeId === empleado.employeeId));

            if (empleadoEnOrden) {
                const fechaInicioOrden = new Date(`${orden.data.startDate}T${horaInicio}`);
                const duracionHorasOrden = item.hours;
                const fechaFinOrden = this.addHours(duracionHorasOrden, fechaInicioOrden);

                const horaInicioStr = horaInicio; //item.hourFrom;
                const [horas, minutos] = horaInicioStr.split(':');                
                const [year, month, day] = orden.data.startDate.split('-');
                const fechaInicioOrden1 = new Date(year, month - 1, day, 0, 0, 0); // Restamos 1 al mes porque en JavaScript los meses van de 0 a 11
                fechaInicioOrden1.setHours(Number(horas), Number(minutos), 0, 0); // Ajustar la hora y los minutos

                console.log("fechaInicioOrden1", fechaInicioOrden1);
                
                console.log("fechaInicioOrden", fechaInicioOrden);
                console.log("duracionHorasOrden", duracionHorasOrden);
                console.log("fechaFinOrden", fechaFinOrden);
                if (
                    (dateStart >= fechaInicioOrden1 && dateStart < fechaFinOrden) || // Verificar conflicto con hora de inicio
                    (dateEnd > fechaInicioOrden1 && dateEnd <= fechaFinOrden)         // Verificar conflicto con hora de finalización
                ) {
                    return true; // Hay conflicto de horario
                }
            }
          }
        }
    }

    return false; // No hay conflicto de horario
}
*/
  async addExistingEmergencyEmployeeModal() {
    
    const dialogRef = this.dialog.open(AddExistingEmployeeComponent);
    const result = await dialogRef.afterClosed().toPromise();
    if (result && result.id) {
        try {
          
          const horaInicio = result.hourFrom // Obtiene la hora de inicio, ajustar según tus necesidades
          console.log("horaInicio", horaInicio)
          const apiUrl = 
          `https://us-central1-highkeystaff.cloudfunctions.net/orders/order/id?id=${this.orderId}`
          // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/order/id?id=${this.orderId}`;
          // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/order/id?id=${this.orderId}`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch order data.');
            }
            
            const orderData = await response.json();
            
            console.log("orderData", orderData)
            console.log("orderData.data.items => ", orderData.data.items)
            console.log("result => ", result)
            console.log("result.position => ", result.position)
            const positionData = orderData.data.items.find(item => item.position === result.position);
            
            if (!positionData) {
                throw new Error('Position data not found.');
            }
            console.log("positionData", positionData)
            const duracionHoras = positionData.hours; // Obtén la duración de las horas desde los datos de la orden
            // const horaFin = this.addHours(duracionHoras, horaInicio);
            const startDate = orderData.data.startDate
            const tieneConflictos = await this.verifyConcurrency(result, horaInicio, duracionHoras, startDate);

          console.log("tieneConflictos", tieneConflictos)
          if (!tieneConflictos) {
            this.isTblLoading = true;
            await this.updateEmployee(result);
            this.addEmployeeToArray(result, startDate, horaInicio);
            await this.updateEmployeesArray();
            await this.updateOrderWithNewEmployee(result);
             this.showNotification(
              'snackbar-success', 
              'Successful Add Employee...!!!', 
              'bottom', 
              'center'); 
            this.getEmployees();
            this.removeSelectedRows();

          }else{
            this.showNotification(
              'snackbar-danger', 
              'Employee is already assigned in another order at this time.', 
              'top', 
              'center')
            console.log('El empleado ya está asignado en otra orden durante ese horario.');
          }
            this.isTblLoading = false;
        } catch (error) {
            console.error('Error:', error);
        }
    } 
    
}

async updateEmployee(result) {
  // Crear un nuevo objeto con los campos deseados
  const employeeData = {
    company: result.company || '',
    email: result.email || '', 
    employeeId: result.employeeId || '',
    firstname: result.firstname || '',
    gender: result.gender || '',
    id : result.id || '',
    lastname:result.lastname || '',
    phone: result.phone || '',
    positions: result.positions || [],
    status: result.status || ''
    // Agregar otros campos que quieras incluir
  };

  const employeeId = result.id;
  const url =  
  // `http://127.0.0.1:5001/highkeystaff/us-central1/users/updateEmployee/id?id=${employeeId}`;
  `https://us-central1-highkeystaff.cloudfunctions.net/users/updateEmployee/id?id=${employeeId}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData), 
  });
  if (!response.ok) {
    throw new Error('Fallo al actualizar el empleado.');
  }
 
}


addEmployeeToArray(result, startDate, horaInicio) {
  
  const addEmployeeRegist = {
      hours: 0,
      hourFrom: result.hourFrom,
      orderId: this.orderId,
      position: result.position,
      dateStart: new Date(`${startDate}T${horaInicio}`),
      break : 0,
      employee: {
          agmRate: result.rate,
          booking: "Emergency",
          data: {
              ...result,
          },
          rate: result.rate,
          id: result.id,
          favourite: "Emergency",
          status: "Confirmed"
      },
      firstName: result.firstname,
      highKeyId: result.employeeId,
      lastName: result.lastname,
      payRollId: result.payrollid || 'No Data',
  };
    // ... (notification logic)
    this.showNotification(
      'snackbar-success',
      'Successful Add Employee...!!!',
      'bottom',
      'center'
    );

 
  this.employeesArray.push(addEmployeeRegist);
}

async updateEmployeesArray() {
// const apiUrl = `http://127.0.0.1:5001/highkeystaff/us-central1/registrations/registbyOrder/orderId?orderId=${this.orderId}`;
 const apiUrl = `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`;

const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employees: this.employeesArray }),
  });

  
  // console.log(response)
  if (!response.ok) {
      throw new Error('Failed to update employees array.');
  }
}

 
  async addNewEmergencyEmployeeModal() {
    try {
        const dialogRef = this.dialog.open(FormDialogComponent);
        const result = await dialogRef.afterClosed().toPromise();

        if (result) {
            const lastEmployeeID = await this.getLastEmployeeID();

            const highKeyid = lastEmployeeID + 1;

            if (result) {
                this.isTblLoading = true;
                await this.createEmployee(highKeyid, result);
                this.addEmployeeToArray2(highKeyid, result);
                await this.updateEmployeesArray();
                await this.updateOrderWithNewEmployee(result);
                this.showNotification(
                  'snackbar-success',  
                  `Successful Add Employee with highkeyId : ${highKeyid}`, 
                  'bottom', 
                  'center');
                this.getEmployees();
                this.removeSelectedRows();
                this.isTblLoading = false;

                // Actualizar el array de employees en la orden

            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async getLastEmployeeID() {
  const response = await fetch(
    `https://us-central1-highkeystaff.cloudfunctions.net/users/getLastEmployeeID`
    // `http://127.0.0.1:5001/highkeystaff/us-central1/users/getLastEmployeeID`
  );
  const data = await response.json();
  return data.lastEmployeeID;
}
async createEmployee(highKeyid, result) {
  
  const addNewEmployee = {
    firstname: result.firstName.toUpperCase(),
    phone: result.phone,
    company: "L&M Employee",
    employeeId: highKeyid,
    positions: [
        {
            rate: result.rate,
            name: result.position
        }
    ],
    email: result.email,
    lastname: result.lastName.toUpperCase(),
    status: "Active"
};
console.log('newEmployee: ',addNewEmployee)

  const response = await fetch(
    `https://us-central1-highkeystaff.cloudfunctions.net/users/addEmployee`,
    // 'http://127.0.0.1:5001/highkeystaff/us-central1/users/addEmployee', 
    {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(addNewEmployee),
  });

  if (!response.ok) {
      throw new Error('Failed to create employee.');
  }
}

addEmployeeToArray2(highKeyid, result) {
 
  const newEmployeeRegist = {
    hours: 0, 
    hourFrom: result.hourFrom,
    orderId:this.orderId,
    position: result.position,
    employee: {
        agmRate: result.rate, 
        booking: "Emergency",
        data: {
            firstname: result.firstName.toUpperCase(),
            employeeId:  highKeyid,
            positions: [
                {
                    rate: result.rate,
                    name: result.position
                }
            ],
            // payrollid: nuevoEmployeeId, 
            lastname: result.lastName.toUpperCase(),
            phone: result.phone,
            company: "L&M Employee",
            email:  result.email,
            status: "Active"
        },
        rate:  result.rate, 
        // id: "ID del nuevo empleado",
        favourite: "Emergency",
        status: "Confirmed"
    },
};

    console.log("newEmployeeRegist", newEmployeeRegist)
  this.employeesArray.push(newEmployeeRegist);
}

async updateOrderWithNewEmployee(result) {
  console.log("result en order", result)
  const apiUrl = 
  `https://us-central1-highkeystaff.cloudfunctions.net/orders/order/id?id=${this.orderId}`
  //`http://127.0.0.1:5001/highkeystaff/us-central1/orders/order/id?id=${this.orderId}`;
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch order data.');
  }

  const orderData = await response.json();
  const newEmployee = {
    agmRate: result.rate,
    booking: 'Emergency',
    data: {
      ...result
    },
    rate: result.rate,
    favourite: 'Emergency',
    status: 'Confirmed',
    id:result.id,
  };

  // Busca el índice del elemento en la lista de 'items' que tenga la misma posición que el nuevo empleado.
  const itemIndex = orderData.data.items.findIndex(item => item.position === result.position && item.hourFrom === result.hourFrom);

  if (itemIndex !== -1) {
    // Agrega el nuevo empleado al arreglo de empleados dentro del elemento encontrado.
    const currentPending = orderData.data.items[itemIndex].pending;
   const currentM = orderData.data.items[itemIndex].m;
    orderData.data.items[itemIndex].employees.push(newEmployee);
    orderData.data.items[itemIndex].pending = currentPending - 1;
    orderData.data.items[itemIndex].m = currentM + 1;

 
    // Actualiza la orden en el servidor con el nuevo empleado agregado.
   
    const updateOrderResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData.data), // Envía solo el objeto 'data' actualizado
    });

    if (!updateOrderResponse.ok) {
      throw new Error('Failed to update order with new employee.');
    }
  } else {
    throw new Error('Item not found in order.');
  }
}
/*
async updateOrderWithNewEmployee(result) {
  console.log("result en order", result)
  const apiUrl = 
  `https://us-central1-highkeystaff.cloudfunctions.net/orders/order/id?id=${this.orderId}`
  // `http://127.0.0.1:5001/highkeystaff/us-central1/orders/order/id?id=${this.orderId}`;
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch order data.');
  }

  const orderData = await response.json();
  const newEmployee = {
    agmRate: result.rate,
    booking: 'Emergency',
    data: {
      ...result
    },
    rate: result.rate,
    favourite: 'Emergency',
    status: 'Confirmed',
    id:result.id,
  };

  // Busca el índice del elemento en la lista de 'items' que tenga la misma posición que el nuevo empleado.
  const itemIndex = orderData.data.items.findIndex(item => item.position === result.position && item.hourFrom === result.hourFrom);

  if (itemIndex !== -1) {
    // Agrega el nuevo empleado al arreglo de empleados dentro del elemento encontrado.
    const currentPending = orderData.data.items[itemIndex].pending;
   const currentM = orderData.data.items[itemIndex].m;
    orderData.data.items[itemIndex].employees.push(newEmployee);
    orderData.data.items[itemIndex].pending = currentPending - 1;
    orderData.data.items[itemIndex].m = currentM + 1;

 
    // Actualiza la orden en el servidor con el nuevo empleado agregado.
   
    const updateOrderResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData.data), // Envía solo el objeto 'data' actualizado
    });

    if (!updateOrderResponse.ok) {
      throw new Error('Failed to update order with new employee.');
    }
  } else {
    throw new Error('Item not found in order.');
  }
}
*/

//INICIO MAPA

// Abre el modal del mapa
openMapModal() {
  const modal = document.getElementById('mapModal');
  modal.style.display = 'block';
  this.createEventMap(this.getSelectedRows());

  // Agrega un evento click para cerrar el modal al hacer clic en el fondo semitransparente
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        this.closeMapModal();
    }
  });
}

// Cierra el modal del mapa
closeMapModal() {
  const modal = document.getElementById('mapModal');
  modal.style.display = 'none';
}

getEventLocation() {
  console.log("Ubicación del evento", this.dataEmployees.data.mapLink);
  const url = new URL(this.dataEmployees.data.mapLink);

  // Obtener la cadena de consulta de la URL
  const queryString = url.search;

  // Buscar las coordenadas en la cadena de consulta
  //const regex = /query=([\d.-]+),([\d.-]+)/;
  const regex = /query=([\d.-]+)%2C([\d.-]+)/;
  const match = queryString.match(regex);

  if (match) {
    const latitude = parseFloat (match[1]); //parseFloat convierte a número.
    const longitude = parseFloat(match[2]); //parseFloat convierte a número.
    this.latitudeEvent = latitude; // Almacenar la latitud en una propiedad
    this.longitudeEvent = longitude; // Almacenar la longitud en una propiedad
    console.log("Latitud evento:", this.latitudeEvent);
    console.log("Longitud evento:", this.longitudeEvent);
  } else {
    console.log("No se encontraron las coordenadas en la URL.");
  }
}
createEventMap(selectedRows: Employees[]) {
  if (selectedRows.length > 0) {
    const map = new Map('mapInModal').setView([selectedRows[0].checkinCoordinates.latitude, selectedRows[0].checkinCoordinates.longitude], 14); // Crea el mapa una sola vez

    // Llamar a getEventLocation() para obtener las coordenadas del evento
    this.getEventLocation();
    this.mostrarCoordenadasEnMapaModal(map, this.latitudeEvent, this.longitudeEvent, "Event");
    
    selectedRows.forEach((row) => {
      const checkinCoord = row.checkinCoordinates;
      const checkoutCoord = row.checkOutCoordinates;
      
      
      if (checkinCoord) {
        const checkinLat = checkinCoord.latitude;
        const checkinLong = checkinCoord.longitude;
        this.mostrarCoordenadasEnMapaModal(map, checkinLat, checkinLong, "Checkin");
      }

      if (checkoutCoord) {
        const checkoutLat = checkoutCoord.latitudeOut;
        const checkoutLong = checkoutCoord.longitudeOut;
        this.mostrarCoordenadasEnMapaModal(map, checkoutLat, checkoutLong, "Checkout");
      }
    });

    console.log('selectedRows: ', selectedRows);
  } else {
    console.log('No se seleccionó ninguna fila');
  }
}

mostrarCoordenadasEnMapaModal(map: Map, coordLat: number, coordLong: number, markerName: string) {
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 40,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  marker([coordLat, coordLong], { title: markerName }).addTo(map).bindPopup(markerName);
}

/*
createEventMap(selectedRows: Employees[]){
  if (selectedRows.length > 0) {
    const coordinatesCheckin = selectedRows.map((row) => row.checkinCoordinates);
    coordinatesCheckin.map((coordenadas)=> {
      const coordLat = coordenadas.latitude
      const coordLong = coordenadas.longitude
      console.log('coordLat CheckIn:', coordLat)
      console.log('coordLong CheckIn:', coordLong)
      this.mostrarCoordenadasEnMapaModal(coordLat,coordLong)
    })
    const coordinatesCheckOut = selectedRows.map((row) => row.checkOutCoordinates);
    coordinatesCheckOut.map((coordenadas)=> {
      const coordLat = coordenadas.latitudeOut
      const coordLong = coordenadas.longitudeOut
      console.log('coordLat CheckOut:', coordLat)
      console.log('coordLong CheckOut:', coordLong)
      this.mostrarCoordenadasEnMapaModal(coordLat,coordLong)
      
    })

    console.log('coordinatesCheckin: ',coordinatesCheckin)
    //this.mostrarCoordenadasEnMapa(checkinLatitude, checkinLongitude, checkoutLatitude, checkoutLongitude);
    console.log('selectedRows: ', selectedRows)
  } else{
    console.log('no se seleccionó ninguna fila')
  }
}

mostrarCoordenadasEnMapaModal(coordLat: number, coordLong: number) {

    const map = new Map('mapInModal').setView([coordLat, coordLong], 17);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom:40,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const markerItem = marker([coordLat, coordLong]).addTo(map).bindPopup("Checkin employee"); //
    
    
}
*/

//FIN MAPA

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

  isAllSelected() {
    const numSelected = this.selection.selected.filter((row) => row.status !== 'No show').length;
    const numRows = this.dataSource.filteredData.filter((row) => row.status !== 'No show').length;
    return numSelected === numRows && numRows > 0;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    const allSelectedWithNullCheckin = this.dataSource.renderedData.every(
      row =>  (row.dateCheckin === null || row.dateCheckin === undefined)
      );
      console.log('this.dataSource.renderedData 2: ',this.dataSource.renderedData)
      console.log('allSelectedWithNullCheckin: ',allSelectedWithNullCheckin)
  
      if (allSelectedWithNullCheckin) {
        console.log('entró al IF')
        this.showCheckInButton = true;
        this.showNoShowButton = true;
        this.showCheckOutButton = false;
      this.showBreakButton = false;
      } else {
        console.log('entró al ELSE')
        this.showCheckInButton = true;
        this.showNoShowButton = true;
        this.showCheckOutButton = true;
        this.showBreakButton = true;
      }


    const verifyIfAllSelected = this.dataSource.renderedData.every(row => this.selection.isSelected(row));
    console.log('Estado de los checkboxes: ',verifyIfAllSelected)
    const isChecked = this.isAllSelected();
    this.dataSource.filteredData.forEach((row) => {
      if (row.status !== 'No show') {
        isChecked ? this.selection.deselect(row) : this.selection.select(row);
      }
    });
    // La siguiente linea asegura que el paginador esté configurado para la primera página.
    this.paginator.firstPage();
    /*  
    // Vacía la selección actual
    this.isAllSelected()
    ? this.selection.clear()
    // Recorre todas las páginas de datos y selecciona las filas
    : this.dataSource.filteredData.forEach(row => {
      if (row.status !== 'No show') {
        this.selection.select(row);
      }
    });
    */
  }
  /*
  masterToggle() {

    // Verificar si todos los elementos seleccionados tienen dateCheckin igual a null o undefined
    console.log('this.dataSource.renderedData 1: ',this.dataSource.renderedData)
  
    const allSelectedWithNullCheckin = this.dataSource.renderedData.every(
    row =>  (row.dateCheckin === null || row.dateCheckin === undefined)
    );
    console.log('this.dataSource.renderedData 2: ',this.dataSource.renderedData)
    console.log('allSelectedWithNullCheckin: ',allSelectedWithNullCheckin)

    if (allSelectedWithNullCheckin) {
      console.log('entró al IF')
      this.showCheckInButton = true;
      this.showNoShowButton = true;
      this.showCheckOutButton = false;
    this.showBreakButton = false;
    } else {
      console.log('entró al ELSE')
      this.showCheckInButton = false;
      this.showNoShowButton = false;
      this.showCheckOutButton = false;
    this.showBreakButton = false;
    }

    const verifyIfAllSelected = this.dataSource.renderedData.every(row => this.selection.isSelected(row));
    console.log('Estado de los checkboxes: ',verifyIfAllSelected)
    const isChecked = this.isAllSelected();
    this.dataSource.filteredData.forEach((row) => {
      if (row.status !== 'No show') {
        isChecked ? this.selection.deselect(row) : this.selection.select(row);
      }
    });
    // La siguiente linea asegura que el paginador esté configurado para la primera página.
    this.paginator.firstPage();
      
    // Vacía la selección actual
    //this.isAllSelected()
    //? this.selection.clear()
    // Recorre todas las páginas de datos y selecciona las filas
    //: this.dataSource.filteredData.forEach(row => {
    //  if (row.status !== 'No show') {
    //    this.selection.select(row);
    //  }
    //});
    
  }
  */

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
    //customVerticalPosition: any,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      //verticalPosition: customVerticalPosition,
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

        this.renderedData = sortedData.map((employee) => {
          const empExactHours = employee.empExactHours;
          // Define un estilo condicional para cambiar el color de fondo si empExactHours es true
          const rowStyle = empExactHours ? { 'background-color': 'red' } : {};
          // console.log( this.renderedData)
          // console.log("employee", employee)
          // console.log("rowStyle",rowStyle)
    
          return {
            ...employee,
            rowStyle: rowStyle, // Agrega el estilo condicional a cada objeto de empleado
          };
        });

        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );

        // console.log("startIndex", startIndex)
        // console.log("this.paginator.pageSize", this.paginator.pageSize)
        // console.log("antesdel renderr", this.employeesArray)
        // this.renderedData = this.employeesArray.slice(startIndex, this.paginator.pageSize);
        
        console.log("this.renderedData", this.renderedData)

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
