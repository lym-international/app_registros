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
import {Map, marker, tileLayer, Marker} from 'leaflet';
import { OrderService } from 'app/_services/order.service';
import { RegistrationService } from 'app/_services/registration.service';
import { GeolocationService } from 'app/_services/geolocation.service';
import { UsersService } from 'app/_services/users.service';

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
  coordinates: string | null = null;
  orderAssigned : string;
  dataSource!: ExampleDataSource;
  positions = [];
  startDate: any;
  updateRegistrationCalled: boolean;
  latitudeEvent: number;
  longitudeEvent: number;
  selected_Rows: any[] = []; // Nueva propiedad para almacenar las selecciones

  latitude: number;
  longitude: number; 
  private map: Map;
  // updateRegistrationCalled: boolean;
  loadingStatus: boolean = false;
  isModalAproveOpen = false;
  modalAproveComments: string = '';
  approveChecked: boolean = false;
  isSaving: boolean = false;


  
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  orderData: any;
  constructor(
    private datePipe: DatePipe,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public employeesService: EmployeesService,
    private snackBar: MatSnackBar,
    private orderDataService: OrderDataService,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private sharingCloseOrderService: SharingCloseOrderService,
    private shareStartDateService: ShareStartDateService,
    private shareTimeDifferenceInMinutesService: ShareTimeDifferenceInMinutesService,
    private ordSvc: OrderService,
    private regSvc: RegistrationService,
    private geolocationService: GeolocationService,
    private usersService: UsersService,
  ) {
    super();
  }

  ngOnInit() {
    this.initializeOrderData();
    this.initializeUserData();
    this.initializeQueryParams();
    this.initializeButtons();
    this.getEmployees();
    this.loadData();
    this.getEventLocation();

    // this.updateDataOrder()
    
  }

  updateDataOrder() {
    this.ordSvc.getOrderById(this.orderId).subscribe(
      (order) => {
        this.dataEmployees = order;
        this.statusOrder = order.data.status;
      },
      (error) => {
        console.error('Error al obtener la orden:', error);
      }
    );
  }

  private initializeOrderData() {
      this.dataEmployees = this.orderDataService.getSelectedOrder();
      this.statusOrder = this.dataEmployees.data.status;  
      this.orderId = this.dataEmployees.id;
      console.log('orderId:', this.orderId, this.statusOrder);
      this.sharingCloseOrderService.setOrderId(this.orderId);
      this.sharingCloseOrderService.setStatusOrder(this.statusOrder);

      this.orderDataService.getSelectedOrderObservable().subscribe((selectedOrder) => {
        // console.log('Activa el subscribe en allEmployees');
        if (selectedOrder) {
          this.dataEmployees = selectedOrder;
          this.statusOrder = this.dataEmployees.data.status;  
          this.orderId = this.dataEmployees.id;

          this.updateShowButtons();
        }
      });

      console.log('Data Order: ', this.dataEmployees);
      this.startDate = this.dataEmployees.data.startDate;
      // console.log('Data StatusOrder: ', this.statusOrder);
      this.exactHourPayment = this.dataEmployees.data.exactHourPayment;
  }

  isUserRoleValid(): boolean {
    if (this.dataUser && this.dataUser.role) {
      const userRole = this.dataUser.role;
      // Verifica si el rol del usuario es "Administrator" o "Client"
      return userRole === 'Administrator' || userRole === 'Supervisor';//|| userRole === 'Client';
    }
    // Si no se proporciona un rol de usuario válido, oculta el botón
    return false;
  }

  closeOrder() {
    this.loadingStatus = true;
    this.ordSvc.closeOrder(this.orderId, this.dataUser.email).subscribe(
      (data) => {
        this.statusOrder = data.data.status;
        // Asumiendo que setSelectedOrder() y setStatusOrder() son métodos del componente actual
        this.orderDataService.setSelectedOrder(data);
        this.sharingCloseOrderService.setStatusOrder(this.statusOrder);
        sessionStorage.removeItem('currentOrders');
        this.loadingStatus = false;
      },
      (error) => {
        console.error('Error al cerrar la orden:', error);
        this.loadingStatus = false;
      }
    );
  }

  private initializeUserData() {
      const storedUserData = sessionStorage.getItem('currentUserData');

      if (storedUserData) {
        this.dataUser = JSON.parse(storedUserData);
      } else {
        this.dataUser = this.authenticationService.getData();
        sessionStorage.setItem('currentUserData', JSON.stringify(this.dataUser));
      }
  }

  private initializeQueryParams() {
      this.route.queryParams.subscribe(params => {
        if (params) {
          // console.log('FormData en AllEmployees:', params);
        }
      });
  }

  private initializeButtons() {
      if(this.statusOrder === 'closed'){
        this.ShowButtons = false;
      } else {
        this.ShowButtons = true;
      }
  }

  private updateShowButtons() {
      if(this.statusOrder === 'closed'){
        this.ShowButtons = false;
      } else {
        this.ShowButtons = true;
      }
  }

  getTimeDifference() {
    return this.shareTimeDifferenceInMinutesService.getTimeDifference();
  }

  // Función para verificar la visibilidad de los botones al hacer clic en el checkbox  
  onCheckboxClick(row: Employees) {
    const { dateCheckin, dateCheckout, break: breakTime } = row;
  
    if (!dateCheckin && !dateCheckout) {
      this.setButtonVisibility(true, false, false, true);
    } else if (dateCheckin && !dateCheckout) {
      this.setButtonVisibility(false, true, true, false);
    } else if (dateCheckout && (!breakTime || breakTime === "0")) {
      this.setButtonVisibility(false, false, true, false);
    } else {
      this.setButtonVisibility(false, false, false, false);
    }
  }

  private setButtonVisibility(checkIn: boolean, checkOut: boolean, breakButton: boolean, noShow: boolean) {
    this.showCheckInButton = checkIn;
    this.showCheckOutButton = checkOut;
    this.showBreakButton = breakButton;
    this.showNoShowButton = noShow;
  }

  getEmployees() {
    this.regSvc.getEmployees(this.orderId).subscribe(
      (data) => {
        console.log("Accion en Bd", data);
        this.handleEmployeeData(data);
        this.isTblLoading = false;
      },
      (error) => {
        console.error('Error fetching employees:', error);
        this.isTblLoading = false;
      }
    );
  }

  private handleEmployeeData(data) {
    this.isTblLoading = false;
    console.log("datadelRegistro:", data);
  
    this.employeesArray = data.employees
      .map(employee => this.transformEmployee(employee))
      .filter(employee => employee !== null);
  
    // console.log('---------------------------');
    // console.log('Array empleados: ', this.employeesArray);
    // console.log('---------------------------');
  
    this.initializeDataSource();
    this.calculateTotalHours();
  }
  
  private transformEmployee(employee) {
    const employeeData = employee.employee ? { ...employee.employee.data } : {};
    const { firstname, lastname, employeeId, payrollid } = employeeData;
  
    if (!firstname || !lastname || !employeeId) return null;
  
    const position = employee.position || "No data";
    const totalHours = employee.hours || "No data";
    const brake = employee.break || "0";
    const hourFrom = employee.hourFrom || "No data";
  
    const dateStart = new Date(`${this.startDate}T${hourFrom}`);
    const hourFromFormatted = this.formatHourFrom(hourFrom);
  
    const checkInTime = this.formatTimestamp(employee.dateCheckin);
    const checkOutTime = this.formatTimestamp(employee.dateCheckout);
  
    return {
      ...employee,
      employee: {
        ...employee.employee,
        data: employeeData,
      },
      firstName: firstname,
      lastName: lastname,
      highKeyId: employeeId,
      position,
      hours: employee.hours,
      totalHours,
      payRollId: payrollid,
      hourFromFormatted,
      hourFrom,
      in: checkInTime,
      out: checkOutTime,
      break: brake,
      dateStart,
    };
  }
  
  private formatHourFrom(hourFrom) {
    if (!hourFrom) return "No Data";
  
    const [hours, minutes] = hourFrom.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }
  
  private formatTimestamp(timestamp) {
    if (!timestamp || !timestamp._seconds) return "No Data";
  
    const date = new Date(timestamp._seconds * 1000);
    return this.datePipe.transform(date, 'hh:mm a');
  }
  
  private initializeDataSource() {
    this.dataSource = new ExampleDataSource(
      this.paginator,
      this.sort,
      this.employeesArray
    );
  
    if (this.statusOrder !== "closed" && !this.updateRegistrationCalled) {
      this.updateRegistration();
      this.updateRegistrationCalled = true;
    }
  }
  
  private calculateTotalHours() {
    this.totalHoursArray = this.employeesArray
      .filter(item => item && item.hours !== null)
      .map(item => Number(item.hours));
  
    const numericArray = this.totalHoursArray.filter(value => !isNaN(value));
  
    this.totalHoursSum = numericArray.reduce((acc, curr) => acc + curr, 0);
    this.totalHoursSum = Number(this.totalHoursSum.toFixed(2));
  }
  
  
  async updateRegistration(): Promise<void> {
    console.log("llama a modific");
    const { employeesArray, dataEmployees: { data: { items, startDate } } } = this;

    if (employeesArray.length === 0) {
      this.addAllEmployees(items, startDate);
    } else {
      this.updateEmployees(items, startDate, employeesArray);
    }

    this.removeRejectedOrSmsSentEmployees(items);

    this.regSvc.updateRegistration(this.orderId, this.employeesArray).subscribe(
      (response) => {
        console.log('Employees array updated successfully:', this.employeesArray);
      },
      (error) => {
        console.error('Failed to update employees array:', error);
      }
    );
  }
  
  private addAllEmployees(items: any[], startDate: string) {
    items.forEach(item => {
      const { hourFrom, employees, position } = item;
      employees.forEach(employee => {
        if (employee.status !== "Rejected" && employee.status !== "SMS Sent") {
          this.employeesArray.push(this.createEmployeeRegist(employee, hourFrom, position, startDate));
        }
      });
    });
  }
  
  private updateEmployees(items: any[], startDate: string, employeesArray: any[]) {
    items.forEach(item => {
      const { hourFrom, employees, position } = item;
      employees.forEach(employee => {
        if (employee.status !== "Rejected" && employee.status !== "SMS Sent") {
          const existingEmployeeIndex = employeesArray.findIndex(existingEmployee => 
            existingEmployee.employee.data.employeeId === employee.data.employeeId &&
            existingEmployee.hourFrom === hourFrom
          );
  
          if (existingEmployeeIndex === -1) {
            this.employeesArray.push(this.createEmployeeRegist(employee, hourFrom, position, startDate));
          }
        }
      });
    });
  }
  
  private createEmployeeRegist(employee: any, hourFrom: string, position: string, startDate: string) {
    const hourFromFormatted = this.formatHour(hourFrom);
    return {
      hours: 0,
      hourFrom,
      hourFromFormatted,
      orderId: this.orderId,
      position,
      dateStart: new Date(`${startDate}T${hourFrom}`),
      break: 0,
      employee: { ...employee },
      favourite: "Emergency",
      firstName: employee.data.firstname,
      highKeyId: employee.data.employeeId,
      lastName: employee.data.lastname,
      payRollId: employee.data.payrollid || 'No Data',
    };
  }
  
  private formatHour(hour: string) {
    if (!hour) return "No Data";
  
    const [hours, minutes] = hour.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }
  
  private removeRejectedOrSmsSentEmployees(items: any[]) {
    const employeeDataArray = items.flatMap(item => 
      item.employees.map(employee => ({ ...employee, hourFrom: item.hourFrom }))
    );
  
    this.employeesArray = this.employeesArray.filter(employee => {
      const { highKeyId, hourFrom } = employee;
      return employeeDataArray.some(dataEmployee =>
        dataEmployee.data.employeeId === highKeyId &&
        dataEmployee.hourFrom === hourFrom &&
        dataEmployee.status !== "Rejected" &&
        dataEmployee.status !== "SMS Sent"
      );
    });
  }
  
    // Reset checkin, checkout y break
  deleteInTime(selectedRows: Employees[]) {
    if (selectedRows.length === 0) return;

    const updatedEmployees = this.updateEmployeeStatus(selectedRows, 'reseted', {
      checkin: false,
      dateCheckin: "-",
      realCheckin: "-",
      dateCheckinRounded: "-",
      checkout: false,
      dateCheckout: "-",
      dateCheckoutRounded: "-",
      updateUser: this.dataUser.email,
      hours: 0,
      break: 0,
      in: 'No Data',
      out: 'No Data',
      totalHours: 0,
      checkinCoordinates: {
        latitude: '-',
        longitude: '-',
      },
      checkOutCoordinates: {
        latitudeOut: '-',
        longitudeOut: '-',
      },
    });

    this.updateEmployeesOnServer(updatedEmployees);
  }

  // Noshow
  outEmployee(selectedRows: Employees[]) {
    if (selectedRows.length === 0) return;

    const updatedEmployees = this.updateEmployeeStatus(selectedRows, 'No show', {
      checkin: false,
      checkout: false,
      dateCheckin: "-",
      dateCheckout: "-",
      realCheckin: "-",
      updateUser: this.dataUser.email,
      hours: 0,
      break: 0,
      totalHours: 0,
    });

    this.updateEmployeesOnServer(updatedEmployees);
  }

  private updateEmployeeStatus(selectedRows: Employees[], status: string, overrides: any) {
    return this.employeesArray.map((employee) => {
      if (selectedRows.some((row) =>
        row.employee.data.employeeId === employee.employee.data.employeeId &&
        row.hourFrom === employee.hourFrom
      )) {
        return { ...employee, ...overrides, status };
      }
      return employee;
    });
  }


  // une los datos de los nuevos empleados con la matriz de empleados existente.
  mergeEmployeesData(newEmployeesData: any[]) {
    return newEmployeesData.map((newEmployee) => {
      const existingEmployee = this.employeesArray.find(
        (emp) => emp.orderId === newEmployee.orderId
      );
      return existingEmployee ? { ...existingEmployee, ...newEmployee } : newEmployee;
    });
  }

  // Refreshes the data
  // refresh() {
  //   this.loadData();
  // }

  // Obtiene la fila seleccionada
  getSelectedRow(): Employees | null {
    return this.selection.selected.length === 1 ? this.selection.selected[0] : null;
  }

  // Obtiene las filas seleccionadas
  getSelectedRows(): Employees[] {
    return this.selection.selected;
  }

  // Formatea un número a dos cifras
  formatTwoDigits(value: number): string {
    return String(value).padStart(2, '0');
  }

  
  updateEmployeesOnServer(updatedEmployees: any[]): void {
    console.log("ACTIALIZA REGISTRO!", updatedEmployees)
    this.regSvc.updateRegistration(this.orderId, updatedEmployees).subscribe(
      (response) => {
        console.log('Employees array updated successfully:', response);
        this.getEmployees();
        this.removeSelectedRows();
        this.showNotification('snackbar-success', 'Successful update!!!', 'bottom', 'center');
      },
      (error) => {
        console.error('Error al actualizar:', error);
        this.showNotification('snackbar-error', 'Failed to update employees.', 'bottom', 'center');
      }
    );
  }

  
  // MODAL ALL ACTIONS
  async allActionsModal(selectedRows: Employees[]) {
    if (selectedRows.length === 0) {
      return; // No hay empleados seleccionados
    }
  
    const dateStartData = selectedRows.map((row) => row.dateStart);
    this.shareStartDateService.setDateStartData(dateStartData);
  
    const dialogRef = this.dialog.open(AllActionsComponent);
    const result = await dialogRef.afterClosed().toPromise();
    const { coordinates } = result;
    const roundedBreak = this.roundHours(result.break / 60);
  
    const timestampIn = Timestamp.fromDate(new Date(result.startDate));
    const timestampOut = Timestamp.fromDate(new Date(result.endDate));
    const checkInTimestamp = timestampIn?.seconds || 0;
    const checkOutTimestamp = timestampOut?.seconds || 0;
  
    const roundedIn = this.roundDate(result.startDate);
    const roundedOut = this.roundDate(result.endDate);
    const timestampCheckinRounded = Timestamp.fromDate(new Date(roundedIn));
    const timestampCheckoutRounded = Timestamp.fromDate(new Date(roundedOut));
    const dateCheckinRounded = timestampCheckinRounded?.seconds || 0;
    const dateCheckoutRounded = timestampCheckoutRounded?.seconds || 0;
    /* try {
      const coordinates = await this.getCoordinates();
      this.latitude = coordinates.latitude;
      this.longitude = coordinates.longitude;
    } catch (error) {
      console.error("Error obteniendo las coordenadas: ", error);
    } */
  
    const updatedEmployees = this.employeesArray.map((employee) => {
      if (selectedRows.some(
        (row) =>
          row.employee.data.employeeId === employee.employee.data.employeeId &&
          row.hourFrom === employee.hourFrom
      )) {
        let updatedHours = 0;
        if (employee.empExactHours) {
          updatedHours = this.calculateRegularHoursAll(dateCheckinRounded, dateCheckoutRounded);
        } else {
          updatedHours = this.calculateHoursWorkedAll(
            employee,
            checkInTimestamp,
            dateCheckinRounded,
            checkOutTimestamp,
            dateCheckoutRounded
          );
  
          const dateCheckin = new Date(dateCheckinRounded * 1000);
          const late = this.validateCheckout(employee.hourFrom, dateCheckin);
          updatedHours = late < 8 && updatedHours === 5 ? updatedHours : updatedHours - roundedBreak;
        }
  
        return {
          ...employee,
          checkin: true,
          checkout: true,
          break: result.break,
          status: "Checked Out",
          dateCheckin: { _seconds: checkInTimestamp, _nanoseconds: 0 },
          realCheckin: { _seconds: checkInTimestamp, _nanoseconds: 0 },
          dateCheckinRounded: { _seconds: dateCheckinRounded, _nanoseconds: 0 },
          dateCheckout: { _seconds: checkOutTimestamp, _nanoseconds: 0 },
          dateCheckoutRounded: { _seconds: dateCheckoutRounded, _nanoseconds: 0 },
          checkOutCoordinates:{latitudeOut: coordinates.latitude, longitudeOut:  coordinates.longitude }, 
          checkinCoordinates: {latitude: coordinates.latitude, longitude:  coordinates.longitude},
          hours: updatedHours.toFixed(2),
          updateUser: this.dataUser.email
        };
      }
      return employee;
    });
  
    await this.updateEmployeesOnServer(updatedEmployees);
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

  async checkInModal(selectedRows: Employees[]) {
    if (selectedRows.length === 0) {
      return; // No hay empleados seleccionados
    }
  
    const dialogRef = this.dialog.open(CheckInComponent, {
      data: {
        employees: this.employees,
        action: 'add',
      },
    });
    const dateStartData = selectedRows.map((row) => row.dateStart);
    this.shareStartDateService.setDateStartData(dateStartData);
  
   
    const result = await dialogRef.afterClosed().toPromise();
    if (!result) {
      console.log('El diálogo fue cerrado sin resultado');
      return; // El diálogo fue cerrado sin resultado
    }
  
    const { startDate, coordinates } = result;

    const checkInTimestamp = Timestamp.fromDate(new Date(startDate)).seconds || 0;
    const rounded = this.roundDate(startDate);
    const dateCheckinRounded = Timestamp.fromDate(new Date(rounded)).seconds || 0;  
    this.isTblLoading = true; // Marcar como cargando
  
    const updatedEmployees = this.employeesArray.map((employee) => {
      const isSelected = selectedRows.some(
        (row) =>
          row.employee.data.employeeId === employee.employee.data.employeeId &&
          row.hourFrom === employee.hourFrom
      );
  
      if (isSelected) {
        return {
          ...employee,
          checkin: true,
          status: "Checked In",
          dateCheckin: { _seconds: checkInTimestamp, _nanoseconds: 0 },
          realCheckin: { _seconds: checkInTimestamp, _nanoseconds: 0 },
          dateCheckinRounded: { _seconds: dateCheckinRounded, _nanoseconds: 0 },
          checkinCoordinates: {latitude: coordinates.latitude, longitude: coordinates.longitude},
          updateUser: this.dataUser.email,
        };
      }
  
      return employee;
    });
  
    await this.updateEmployeesOnServer(updatedEmployees);
  
    this.isTblLoading = false; // Marcar como no cargando
    this.showNotification(
      'snackbar-success',
      'Successful CheckIn...!!!',
      'bottom',
      'center'
    );
  }

  roundDate(date: Date): Date {
    const roundedDate = new Date(date);
    roundedDate.setSeconds(0, 0);
    
    const minutes = roundedDate.getMinutes();
    let roundedMinutes;
  
    if (minutes <= 7) {
      roundedMinutes = 0;
    } else if (minutes <= 22) {
      roundedMinutes = 15;
    } else if (minutes <= 37) {
      roundedMinutes = 30;
    } else if (minutes <= 52) {
      roundedMinutes = 45;
    } else {
      roundedMinutes = 60;
    }
  
    roundedDate.setMinutes(roundedMinutes);
    return roundedDate;
  }

  roundHours(hour: number): number {
    const trunc = Math.floor(hour);
    const minutes = (hour - trunc) * 60;
    let decimal;
  
    if (minutes <= 7) {
      decimal = 0;
    } else if (minutes <= 22) {
      decimal = 0.25;
    } else if (minutes <= 37) {
      decimal = 0.5;
    } else if (minutes <= 52) {
      decimal = 0.75;
    } else {
      decimal = 1.0;
    }
  
    return trunc + decimal;
  }

  async checkOutModal(selectedRows: Employees[]) {
    if (selectedRows.length === 0) {
      return; // No hay empleados seleccionados
    }
  
    const dialogRef = this.dialog.open(CheckOutComponent, {
      data: {
        employees: this.employees,
        action: 'add',
      },
    });
    const dateStartData = selectedRows.map((row) => row.dateStart);
    this.shareStartDateService.setDateStartData(dateStartData);
  
   
    const result = await dialogRef.afterClosed().toPromise();
    if (!result) {
      console.log('El diálogo fue cerrado sin resultado');
      return; // El diálogo fue cerrado sin resultado
    }
    const { endDate, coordinates } = result;
    const checkOutTimestamp = Timestamp.fromDate(new Date(endDate)).seconds || 0;
    const rounded = this.roundDate(endDate);
    const dateCheckoutRounded = Timestamp.fromDate(new Date(rounded)).seconds || 0;

    this.latitude = coordinates.latitude;
    this.longitude = coordinates.longitude;  

    this.isTblLoading = true; // Marcar como cargando
    const updatedEmployees = this.employeesArray.map((employee) => {
      const isSelected = selectedRows.some(
        (row) =>
          row.employee.data.employeeId === employee.employee.data.employeeId &&
          row.hourFrom === employee.hourFrom
      );
      if (isSelected) {
        const roundedHours = employee.empExactHours
          ? this.calculateRegularHours(employee, dateCheckoutRounded)
          : this.calculateHoursWorked(employee, checkOutTimestamp, dateCheckoutRounded);
        
        return {
          ...employee,
          checkout: true,
          dateCheckout: { _seconds: checkOutTimestamp, _nanoseconds: 0 },
          dateCheckoutRounded: { _seconds: dateCheckoutRounded, _nanoseconds: 0 },
          checkOutCoordinates:{latitudeOut: coordinates.latitude, longitudeOut: coordinates.longitude}, 
          updateUser: this.dataUser.email,
          status: 'Checked Out',
          hours: roundedHours.toFixed(2),
          // break: 0,
        };
      }else(
        console.log("No se encontro fila seleccionada")
      )
  
      return employee;
    });
  
    await this.updateEmployeesOnServer(updatedEmployees);
  
    this.isTblLoading = false; // Marcar como no cargando
    this.showNotification(
      'snackbar-success',
      'Successful CheckOut...!!!',
      'bottom',
      'center'
    );
  }

  async markEmpWorkHours(selectedRows: Employees[]) {
    if (selectedRows.length === 0) {
      return; // No hay empleados seleccionados
    }
  
    const updatedEmployees = this.employeesArray.map((employee) => {
      const isSelected = selectedRows.some(
        (row) =>
          row.employee.data.employeeId === employee.employee.data.employeeId &&
          row.hourFrom === employee.hourFrom
      );
  
      if (isSelected) {
        return {
          ...employee,
          empExactHours: !employee.empExactHours,
          updateUser: this.dataUser.email,
        };
      }
  
      return employee;
    });
  
    console.log("updatedEmployees", updatedEmployees);
  
    await this.updateEmployeesOnServer(updatedEmployees);
  
    this.showNotification(
      'snackbar-success',
      'Employee marked successfully...!!!',
      'bottom',
      'center'
    );
  }

  async breakModal(selectedRows: Employees[]) {
    this.employeesArray.forEach((employee) => {
      employee.selected = false;
    });
  
    if (selectedRows.length === 0) {
      return; // No hay empleados seleccionados
    }
  
    console.log('Empleados seleccionados para break:', selectedRows);
    const dialogRef = this.dialog.open(BreakComponent, {
      data: {
        employees: this.employees,
        action: 'add',
      },
    });
  
    const result = await dialogRef.afterClosed().toPromise();
    if (!result) {
      return; // El diálogo fue cerrado sin resultado
    }
  
    const roundedBreak = this.roundHours(result.break / 60);
  
    const updatedEmployees = this.employeesArray.map((employee) => {
      const isSelected = selectedRows.some(
        (row) =>
          row.employee.data.employeeId === employee.employee.data.employeeId &&
          row.hourFrom === employee.hourFrom  &&
          employee.dateCheckin !== null &&
          employee.dateCheckin !== undefined

          // employee.dateCheckout !== null &&
          // dateCheckin
          // employee.dateCheckout !== undefined
      );
  
      if (isSelected) {
        if(employee.dateCheckout !== null && employee.dateCheckout !== undefined){
            const roundedHours = employee.empExactHours
            ? this.calculateRegularHours(employee, employee.dateCheckoutRounded._seconds)
            : this.calculateHoursWorked(employee, employee.dateCheckout._seconds, employee.dateCheckoutRounded._seconds);
    
          const totalHours = roundedHours.toFixed(2);
          const dateCheckin = new Date(employee.dateCheckin._seconds * 1000);
          const late = this.validateCheckout(employee.hourFrom, dateCheckin);
    
          if (late < 8 && employee.hours == 5) {
            this.updatedHours = employee.hours;
          } else {
            this.updatedHours = Number(totalHours) - roundedBreak;
          }
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
    await this.updateEmployeesOnServer(updatedEmployees);
  
    this.showNotification(
      'snackbar-success',
      'Successful break...!!!',
      'bottom',
      'center'
    );
  }

  calculateHoursWorkedAll(
    employee: Employees,
    checkInTimestamp: number,
    dateCheckinRounded: number,
    checkOutTimestamp: number,
    dateCheckoutRounded: number
  ): number {
    if (this.exactHourPayment) {
      return this.calculateExactHourPaymentAll(checkInTimestamp, checkOutTimestamp);
    }
  
    const lateThreshold = 8;
    const secondsWorked = dateCheckoutRounded - dateCheckinRounded;
    const hoursWorked = secondsWorked / 3600;
    let roundedHours = this.roundHours(hoursWorked);
  
    if (roundedHours < 5) {
      const dateCheckin = new Date(checkInTimestamp * 1000);
      const late = this.validateCheckout(employee.hourFrom, dateCheckin);
  
      if (late < 8) {
        roundedHours = 5;
      } else if (late > lateThreshold) {
        roundedHours = this.calculateRegularHoursAll(dateCheckinRounded, dateCheckoutRounded);
      }
    }
  
    return roundedHours;
  }

  calculateHoursWorked(
    employee: Employees,
    checkOutTimestamp: number,
    dateCheckoutRounded: number
    ): number {
    if (this.exactHourPayment) {
      return this.calculateExactHourPayment(employee, checkOutTimestamp);
    }
    let roundedBreak =0;
    if(employee.break){
      roundedBreak = this.roundHours(Number(employee.break)/ 60);
    }
    const lateThreshold = 8;
    const secondsWorked = dateCheckoutRounded - employee.dateCheckinRounded._seconds;
    const hoursWorked = secondsWorked / 3600;
    
    let roundedHours = this.roundHours(hoursWorked);
    roundedHours = roundedHours - roundedBreak;
  
    if (roundedHours < 5) {
      const dateCheckin = new Date(employee.dateCheckin._seconds * 1000);
      const late = this.validateCheckout(employee.hourFrom, dateCheckin);
  
      if (late < 8) {
        roundedHours = 5;
      } else if (late > lateThreshold) {
        roundedHours = this.calculateRegularHours(employee, dateCheckoutRounded);
      }
    }
  
    return roundedHours;
  }

  validateCheckout(hourFrom: string, checkinDate: Date): number {
    const [hour, minute] = hourFrom.split(':').map(Number);
    const hourLimit = new Date(checkinDate);
    hourLimit.setHours(hour, minute, 0, 0);
  
    const diff = checkinDate.getTime() - hourLimit.getTime();
    return diff > 0 ? Math.floor(diff / 60000) : 0;
  }
  
  calculateRegularHoursAll(dateCheckinRounded: number, dateCheckoutRounded: number): number {
    return this.calculateTimeDifference(dateCheckinRounded, dateCheckoutRounded);
  }

  calculateRegularHours(employee: Employees, dateCheckoutRounded: number): number {
    return this.calculateTimeDifference(employee.dateCheckinRounded._seconds, dateCheckoutRounded);
  }

  //Aplica solo para dos clientes específicos
  calculateExactHourPaymentAll(checkInTimestamp: number, checkOutTimestamp: number): number {
    return this.calculateTimeDifference(checkInTimestamp, checkOutTimestamp);
  }

  calculateExactHourPayment(employee: Employees, checkOutTimestamp: number): number {
    return this.calculateTimeDifference(employee.dateCheckin._seconds, checkOutTimestamp);
  }
  
  calculateTimeDifference(startTimestamp: number, endTimestamp: number): number {
    const secondsWorked = endTimestamp - startTimestamp;
    const hoursWorked = secondsWorked / 3600;
    return Number(hoursWorked.toFixed(2));
  }
  async loadTimesheet() {
    this.outEmployees = [];
    this.pdfEmployees = [];
    let total = 0;
  
    if (this.employeesArray) {
      for (const emp of this.employeesArray) {
        this.outEmployees.push(emp);
        if (emp.checkout) {
          total += Number(emp.hours);
          this.pdfEmployees.push(emp);
        }
      }
    }
  
    this.timeSheet.total = total.toFixed(2);
  }
  
  getEmployeesObject(employees) {
    return {
      columns: [
        { width: '*', text: '' },
        {
          width: 'auto',
          alignment: 'left',
          table: {
            widths: Array(8).fill('auto'),
            body: [
              [
                { text: "No", style: "tableHeader" },
                { text: "LAST NAME", style: "tableHeader" },
                { text: "FIRST NAME", style: "tableHeader" },
                { text: "HK ID", style: "tableHeader" },
                { text: "IN", style: "tableHeader" },
                { text: "BREAK", style: "tableHeader" },
                { text: "OUT", style: "tableHeader" },
                { text: "TOTAL", style: "tableHeader" },
              ],
              ...this.groupEmployees.map(emp => emp),
            ],
          },
        },
        { alignment: 'left', margin: [30, 10, 0, 10], text: '' },
      ],
    };
  }
  
  async getDocumentDefinition() {
    const getImageAsBase64 = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };
  
    this.employeesArray.sort((a, b) => {
      const lastNameA = (a.lastname || '').toLowerCase();
      const lastNameB = (b.lastname || '').toLowerCase();
      const firstNameA = (a.firstname || '').toLowerCase();
      const firstNameB = (b.firstname || '').toLowerCase();
      return lastNameA.localeCompare(lastNameB) || firstNameA.localeCompare(firstNameB);
    });
  
    const generated = this.datePipe.transform(Date.now(), "MMMM d, y");
    const logoBase64 = await getImageAsBase64('https://firebasestorage.googleapis.com/v0/b/highkeystaff.appspot.com/o/Emails%2Flogolm-min.png?alt=media&token=7f1badc5-9f07-476c-82b0-7a16a3254ff0');
    await this.loadTimesheet();
  
    return {
      content: [
        { image: logoBase64, width: 100, height: 70, absolutePosition: { x: 30, y: 10 } },
        { text: "(410) 922-6140\noperations@stafflm.com", style: "header", fontSize: 9.5, alignment: "left", absolutePosition: { x: 35, y: 70 } },
        { text: `Order: ${this.dataEmployees.data.orderId}`, style: "header", alignment: "right" },
        { text: `Timesheet`, bold: true, fontSize: 30, alignment: "center", margin: [0, 0, 0, 5] },
        { text: `Customer:${this.dataEmployees.data.company}`, bold: true, fontSize: 20, alignment: "center", margin: [0, 0, 0, 5] },
        { text: `${this.dataEmployees.data.place}`, bold: true, fontSize: 15, alignment: "center", margin: [0, 0, 0, 5] },
        { text: `${this.dataEmployees.data.address} ${this.dataEmployees.data.city} ${this.dataEmployees.data.state} ${this.dataEmployees.data.zipcode}`, bold: true, fontSize: 13, alignment: "center", margin: [0, 0, 0, 5] },
        { text: `Date: ${this.dataEmployees.data.startDate}`, bold: true, alignment: "center", margin: [0, 0, 0, 20] },
        this.getEmployeesObject(this.employeesArray),
        { text: this.timeSheet.total > 0 ? `Total hours: ${this.timeSheet.total}` : '', margin: [380, 10, 0, 0] },
        { text: "NOTE:", alignment: 'left', margin: [30, 30, 0, 0] },
        { canvas: [{ type: "rect", x: 10, y: 10, w: 400, h: 80 }], alignment: 'left', margin: [30, 10, 0, 10] },
        { text: "The time as shown on the Time-Sheet are correct and the work has been performed to our satisfaction. Employee certifies that this form is true and accurate and that no injuries were sustained during this assigment and will not solicit permanent, part time, independent contract with any of our clients.", fontSize: 10, alignment: 'left', margin: [30, 10, 0, 10] },
        { text: `________________________\n Authorized Representative of Costumer\n ${this.dataEmployees.data.company}`, alignment: 'left', margin: [30, 10, 0, 10] },
        { text: '________________\n Invoice', alignment: "right", margin: [0, 20, 0, 0] },
      ],
      footer: (currentPage, pageCount) => ({
        margin: 10,
        columns: [
          {
            fontSize: 10,
            text: [
              { text: "--------------------------------------------------------------------------\nL&M Internacional\n", margin: [0, 20] },
              { text: `Your Staffing Solution: T:(410)922-6140, F:(410)922-6150, www.stafflm.com, Generated: ${generated}` },
            ],
            alignment: "center",
          },
        ],
      }),
      info: {
        title: `Timesheet ${this.dataEmployees.data.company}_${this.dataEmployees.data.orderId}_${this.dataEmployees.data.startDate}`,
      },
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 20, 0, 10], decoration: "underline" },
        name: { fontSize: 16, bold: true },
        tableHeader: { bold: true },
        signature: { margin: [20, 0, 0, 20] },
      },
    };
  }
  
  generatePdf() {
    this.employeesArray.sort((a, b) => {
      const lastNameA = (a.lastName || '').toLowerCase();
      const lastNameB = (b.lastName || '').toLowerCase();
      const firstNameA = (a.firstName || '').toLowerCase();
      const firstNameB = (b.firstName || '').toLowerCase();
      return lastNameA.localeCompare(lastNameB) || firstNameA.localeCompare(firstNameB);
    });
  
    this.groupEmployees = [];
    const positions = [];
  
    const convertTimestampToTime = (timestamp: any): string => {
      if (timestamp && timestamp._seconds && timestamp._nanoseconds !== undefined) {
        const date = new Date(timestamp._seconds * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = (hours % 12 === 0 ? 12 : hours % 12).toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        return `${formattedHours}:${formattedMinutes} ${period}`;
      }
      return "";
    };
  
    const employeesToShow = this.employeesArray.filter(emp => emp.status !== "No show");
  
    employeesToShow.forEach((employee) => {
      const foundPosition = positions.find(
        group => group.name == employee.position && group.hour == employee.hourFrom
      );
      if (!foundPosition) {
        const positionsArray = this.employeesArray.filter(
          emps => emps.position == employee.position && emps.hourFrom == employee.hourFrom
        );
        const totalHours = positionsArray.reduce((total, position) => total + Number(position.hours), 0);
        positions.push({ name: employee.position, hour: employee.hourFrom, total: totalHours });
      }
    });
  
    positions.forEach((position) => {
      this.groupEmployees.push([
        { colSpan: 8, text: `${position.name} - ${position.hour} / Hours by position: ${position.total}`, style: "tableHeader" },
        "-", "-", "-", "-", "-", "-", "-",
      ]);
  
      const employees = employeesToShow.filter(
        employee => employee.position == position.name && employee.hourFrom == position.hour
      );
  
      employees.forEach((emp, index) => {
        let dateFrom, dateTo;
        if (emp.status == "No show") {
          dateFrom = "No show";
          emp.hours = 0;
          emp.break = "No show";
          dateTo = "No show";
        } else {
          dateFrom = emp.checkin ? convertTimestampToTime(emp.dateCheckin) : "-";
          dateTo = emp.checkout ? convertTimestampToTime(emp.dateCheckout) : "-";
          emp.break = emp.checkout ? emp.break : "No checkout";
        }
        this.groupEmployees.push([
          index + 1,
          emp.employee.data.lastname[0].toUpperCase() + emp.employee.data.lastname.substring(1).toLowerCase(),
          emp.employee.data.firstname[0].toUpperCase() + emp.employee.data.firstname.substring(1).toLowerCase(),
          emp.employee.data.employeeId ? emp.employee.data.employeeId : "0",
          dateFrom,
          emp.break,
          dateTo,
          emp.hours,
        ]);
      });
    });
  
    this.getDocumentDefinition().then(result => {
      pdfMake.createPdf(result).open();
    });
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

  async addExistingEmergencyEmployeeModal() {
    const dialogRef = this.dialog.open(AddExistingEmployeeComponent);
    const result = await dialogRef.afterClosed().toPromise();

    if (result && result.id) {
      try {
        this.orderData = await this.ordSvc.getOrderById(this.orderId).toPromise();
        const positionData = this.findPositionData(this.orderData, result.position);

        if (!positionData) throw new Error('Position data not found.');
        sessionStorage.removeItem('currentOrders');
        const duracionHoras = positionData.hours;
        const startDate = this.orderData.data.startDate;

        this.ordSvc.verifyConcurrency(result, result.hourFrom, duracionHoras, startDate).subscribe(
          async (tieneConflictos) => {
            if (!tieneConflictos) {
              await this.addAndProcessEmployee(result, startDate);
            } else {
              this.showNotification('snackbar-danger', `Employee is already assigned in order number ${this.orderAssigned} at this time.`, 'top', 'center');
            }
          },
          (error) => {
            console.error('Error verifying concurrency:', error);
          }
        );
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  findPositionData(orderData: any, position: string) {
    return orderData.data.items.find(item => item.position === position);
  }
  async addAndProcessEmployee(result: any, startDate: string) {
    this.isTblLoading = true;
    await this.updateEmployee(result);
    this.addEmployeeToArray(result, startDate, result.hourFrom);
    await this.updateEmployeesArray();
    await this.updateOrderWithExistingEmployee(result);
    this.showNotification('snackbar-success', 'Successful Add Employee...!!!', 'bottom', 'center');
    this.getEmployees();
    this.removeSelectedRows();
    this.isTblLoading = false;
  }
  async updateEmployee(result: any) {
    const employeeData = {
      company: result.company || '',
      email: result.email || '', 
      employeeId: result.employeeId || '',
      firstname: result.firstname || '',
      gender: result.gender || '',
      id: result.id || '',
      lastname: result.lastname || '',
      phone: result.phone || '',
      positions: result.positions || [],
      status: result.status || ''
    };

    try {
      await this.usersService.updateEmployee(employeeData).toPromise();
      console.log('Employee updated successfully');
    } catch (error) {
      console.error('Error updating employee:', error);
      throw new Error('Failed to update the employee.');
    }
  }

  addEmployeeToArray(result: any, startDate: string, horaInicio: string) {
    const addEmployeeRegist = {
      hours: 0,
      hourFrom: result.hourFrom,
      orderId: this.orderId,
      position: result.position,
      dateStart: new Date(`${startDate}T${horaInicio}`),
      break: 0,
      employee: {
        agmRate: result.rate,
        booking: "Emergency",
        data: { ...result },
        rate: result.rate,
        id: result.id,
        favourite: "Emergency",
        status: "Confirmed"
      },
      favourite: "Emergency",
      firstName: result.firstname,
      highKeyId: result.employeeId,
      lastName: result.lastname,
      payRollId: result.payrollid || 'No Data',
    };

    this.employeesArray.push(addEmployeeRegist);
    this.showNotification('snackbar-success', 'Successful Add Employee...!!!', 'bottom', 'center');
  }

  async updateEmployeesArray() {
    try {
      await this.regSvc.updateRegistration(this.orderId, this.employeesArray).toPromise();
      this.getEmployees();
      this.removeSelectedRows();
      this.showNotification('snackbar-success', 'Successful update!!!', 'bottom', 'center');
    } catch (error) {
      console.error('Error updating employees array:', error);
      this.showNotification('snackbar-error', 'Failed to update employees.', 'bottom', 'center');
    }
  }



  async addNewEmergencyEmployeeModal() {
    try {
      const dialogRef = this.dialog.open(FormDialogComponent);
      const result = await dialogRef.afterClosed().toPromise();

      if (result) {
        const lastEmployeeID = await this.getLastEmployeeID();
        const highKeyid = lastEmployeeID + 1;
        sessionStorage.removeItem('currentOrders');
        this.isTblLoading = true;
        await this.createEmployee(highKeyid, result);
        this.addEmployeeToArray2(highKeyid, result);
        await this.updateEmployeesArray();
        await this.updateOrderWithNewEmployee(highKeyid, result);
        this.showNotification('snackbar-success', `Successful Add Employee with highkeyId : ${highKeyid}`, 'bottom', 'center');
        this.getEmployees();
        this.removeSelectedRows();
        this.isTblLoading = false;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getLastEmployeeID() {
    try {
      const data = await this.usersService.getLastEmployeeID().toPromise();
      console.log('Last employee ID:', data.lastEmployeeID);
      return data.lastEmployeeID;
    } catch (error) {
      console.error('Error fetching last employee ID:', error);
      throw new Error('Failed to fetch last employee ID.');
    }
  }

  async createEmployee(highKeyid: number, result: any) {
    const newEmployee = {
      firstname: result.firstName.toUpperCase(),
      phone: result.phone,
      company: "L&M Employee",
      employeeId: highKeyid,
      positions: [{ rate: result.rate, name: result.position }],
      email: result.email,
      lastname: result.lastName.toUpperCase(),
      status: "Active",
      source: "Emergency"
    };

    try {
      await this.usersService.createEmployee(newEmployee).toPromise();
      console.log('Employee created successfully');
    } catch (error) {
      console.error('Error creating employee:', error);
      throw new Error('Failed to create the employee.');
    }
  }

  addEmployeeToArray2(highKeyid: number, result: any) {
    const newEmployeeRegist = {
      hours: 0,
      hourFrom: result.hourFrom,
      orderId: this.orderId,
      position: result.position,
      employee: {
        agmRate: result.rate,
        booking: "Emergency",
        data: {
          firstname: result.firstName.toUpperCase(),
          employeeId: highKeyid,
          positions: [{ rate: result.rate, name: result.position }],
          lastname: result.lastName.toUpperCase(),
          phone: result.phone,
          company: "L&M Employee",
          email: result.email,
          status: "Active"
        },
        rate: result.rate,
        favourite: "Emergency",
        status: "Confirmed"
      },
    };

    this.employeesArray.push(newEmployeeRegist);
  }

  async updateOrderWithNewEmployee(highKeyid: number, result: any) {
    try {
      const orderData = await this.ordSvc.getOrderById(this.orderId).toPromise();

      const newEmployee = {
        agmRate: result.rate,
        booking: 'Emergency',
        data: {
          firstname: result.firstName.toUpperCase(),
          phone: result.phone,
          company: "L&M Employee",
          employeeId: highKeyid,
          positions: [{ rate: result.rate, name: result.position }],
          email: result.email,
          lastname: result.lastName.toUpperCase(),
          status: "Active"
        },
        rate: result.rate,
        favourite: 'Emergency',
        status: 'Confirmed',
        id: result.id,
      };

      const itemIndex = orderData.data.items.findIndex(item => item.position === result.position && item.hourFrom === result.hourFrom);

      if (itemIndex !== -1) {
        orderData.data.items[itemIndex].employees.push(newEmployee);
        orderData.data.items[itemIndex].pending -= 1;
        orderData.data.items[itemIndex].m += 1;

        await this.updateOrderData(orderData);
      } else {
        throw new Error('Item not found in order.');
      }
    } catch (error) {
      console.error('Error updating order with new employee:', error);
    }
  }

  async updateOrderData(orderData: any) {
    try {
      await this.ordSvc.updateOrder(this.orderId, orderData).toPromise();
      this.showNotification('snackbar-success', 'Order updated successfully.', 'top', 'center');
    } catch (error) {
      console.error('Error updating order data:', error);
      this.showNotification('snackbar-danger', 'Error updating order data.', 'top', 'center');
    }
  }

  async updateOrderWithExistingEmployee(result: any) {
    try {
      const orderData = await this.ordSvc.getOrderById(this.orderId).toPromise();

      const itemIndex = orderData.data.items.findIndex(item => item.position === result.position && item.hourFrom === result.hourFrom);

      if (itemIndex !== -1) {
        const newEmployee = {
          agmRate: result.rate,
          booking: 'Emergency',
          data: { ...result },
          rate: result.rate,
          favourite: 'Emergency',
          status: 'Confirmed',
          id: result.id,
        };

        orderData.data.items[itemIndex].employees.push(newEmployee);
        orderData.data.items[itemIndex].pending -= 1;
        orderData.data.items[itemIndex].m += 1;
        console.log("OrdenActualizada", orderData)
        await this.updateOrderData(orderData);
      } else {
        throw new Error('Item not found in order.');
      }
    } catch (error) {
      console.error('Error updating order with existing employee:', error);
    }
  }

  //INICIO MAPA
  // Obtiene la ubicación del evento
  getEventLocation() {
    if (this.dataEmployees && this.dataEmployees.data && this.dataEmployees.data.mapLink) {
      const url = this.dataEmployees.data.mapLink;
      console.log("Ubicación del evento", url);

      const coordinates = this.extractCoordinatesFromURL(url);
      if (coordinates) {
        const { latitude, longitude } = coordinates;
        this.latitudeEvent = latitude;
        this.longitudeEvent = longitude;
        console.log("Latitud evento:", this.latitudeEvent);
        console.log("Longitud evento:", this.longitudeEvent);
      } else {
        console.log("No se encontraron las coordenadas en la URL.");
      }
    } else {
      console.log("No se encontró la URL del mapa en los datos del empleado.");
    }
    
  }
  // Extrae las coordenadas de una URL de Google Maps
  extractCoordinatesFromURL(url: string): { latitude: number, longitude: number } | null {
    console.log("llama a estraccions", url);
    // Coincidir con el formato de coordenadas en la URL proporcionada
    const queryMatch = url.match(/query=(-?\d+\.\d+)%2C(-?\d+\.\d+)/);
    if (queryMatch) {
      console.log("entra por el if");
      return { latitude: parseFloat(queryMatch[1]), longitude: parseFloat(queryMatch[2]) };
    }
    
    // Coincidir con el formato de coordenadas en los otros tipos de URL
    const gooGlMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (gooGlMatch) {
      console.log("entra por el else if");
      return { latitude: parseFloat(gooGlMatch[1]), longitude: parseFloat(gooGlMatch[2]) };
    }

    const googleMapsMatch = url.match(/\/maps\/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (googleMapsMatch) {
      console.log("entra por el else if");
      return { latitude: parseFloat(googleMapsMatch[1]), longitude: parseFloat(googleMapsMatch[2]) };
    }
    
    return null;
  }

  // Abre el modal del mapa
  openMapModal(row) {
    console.log("row", row);

    // Validar coordenadas
    const validCoordinates = this.validateCoordinates(row);
    
    if (!validCoordinates) {
      // alert('No hay ubicaciones disponibles para mostrar el mapa.');
      this.showNotification('warning', 'No locations available to display the map.', 'top', 'center');
      return;
    }

    const modal = document.getElementById('mapModal');
    modal.style.display = 'block';
    this.createEventMap(row);

    const closeModalHandler = (event) => {
      if (event.target === modal) {
        this.closeMapModal();
        modal.removeEventListener('click', closeModalHandler);
      }
    };
    modal.addEventListener('click', closeModalHandler);
  }

  closeMapModal() {
    const modal = document.getElementById('mapModal');
    modal.style.display = 'none';

    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  createEventMap(selectedRows) {
    let lat: number, long: number;

    if (this.isValidCoordinate(selectedRows.checkinCoordinates.latitude) && this.isValidCoordinate(selectedRows.checkinCoordinates.longitude)) {
      lat = parseFloat(selectedRows.checkinCoordinates.latitude as string);
      long = parseFloat(selectedRows.checkinCoordinates.longitude as string);
    } else if (this.isValidCoordinate(selectedRows.checkOutCoordinates.latitudeOut) && this.isValidCoordinate(selectedRows.checkOutCoordinates.longitudeOut)) {
      lat = parseFloat(selectedRows.checkOutCoordinates.latitudeOut as string);
      long = parseFloat(selectedRows.checkOutCoordinates.longitudeOut as string);
    } else if (this.isValidCoordinate(this.latitudeEvent) && this.isValidCoordinate(this.longitudeEvent)) {
      lat = this.latitudeEvent;
      long = this.longitudeEvent;
    } else {
      alert('No hay ubicaciones disponibles para mostrar el mapa.');
      return;
    }

    this.map = new Map('mapInModal').setView([lat, long], 14);
    this.getEventLocation();

    if (this.isValidCoordinate(this.latitudeEvent) && this.isValidCoordinate(this.longitudeEvent)) {
      this.mostrarCoordenadasEnMapaModal(this.map, this.latitudeEvent, this.longitudeEvent, "Event");
    }

    this.addEmployeeMarkersToMap(this.map, selectedRows);
    console.log('selectedRows: ', selectedRows);
  }

  addEmployeeMarkersToMap(map: Map, row: Employees) {
    const { checkinCoordinates, checkOutCoordinates } = row;

    if (this.isValidCoordinate(checkinCoordinates.latitude) && this.isValidCoordinate(checkinCoordinates.longitude)) {
      this.mostrarCoordenadasEnMapaModal(map, parseFloat(checkinCoordinates.latitude as unknown as string), parseFloat(checkinCoordinates.longitude as unknown as string), "Checkin");
    }

    if (this.isValidCoordinate(checkOutCoordinates.latitudeOut) && this.isValidCoordinate(checkOutCoordinates.longitudeOut)) {
      this.mostrarCoordenadasEnMapaModal(map, parseFloat(checkOutCoordinates.latitudeOut as unknown as string), parseFloat(checkOutCoordinates.longitudeOut as unknown as string), "Checkout");
    }
  }

  mostrarCoordenadasEnMapaModal(map: Map, coordLat: number, coordLong: number, markerName: string) {
    console.log("coordlat, coordlong", coordLat, coordLong);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 40,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker([coordLat, coordLong], { title: markerName }).addTo(map).bindPopup(markerName);
  }

  // Función para validar coordenadas
  isValidCoordinate(coordinate: any) {
    return coordinate !== undefined && coordinate !== '-' && coordinate !== '' && !isNaN(parseFloat(coordinate as unknown as string));
  }

  // Función para validar todas las coordenadas de un registro
  validateCoordinates(row) {
    return (
      (this.isValidCoordinate(row.checkinCoordinates.latitude) && this.isValidCoordinate(row.checkinCoordinates.longitude)) ||
      (this.isValidCoordinate(row.checkOutCoordinates.latitudeOut) && this.isValidCoordinate(row.checkOutCoordinates.longitudeOut)) ||
      (this.isValidCoordinate(this.latitudeEvent) && this.isValidCoordinate(this.longitudeEvent))
    );
  }

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
    this.toggleCheckInOutButtons();
    this.toggleSelection();
    this.paginator.firstPage();
  }
  // Verifica y establece los botones de check-in, no-show, check-out y break
  toggleCheckInOutButtons() {
    const allSelectedWithNullCheckin = this.dataSource.renderedData.every(
      row => row.dateCheckin === null || row.dateCheckin === undefined
    );
    // console.log('this.dataSource.renderedData 2: ', this.dataSource.renderedData);
    // console.log('allSelectedWithNullCheckin: ', allSelectedWithNullCheckin);
  
    if (allSelectedWithNullCheckin) {
      // console.log('Entró al IF');
      this.showCheckInButton = true;
      this.showNoShowButton = true;
      this.showCheckOutButton = false;
      this.showBreakButton = false;
    } else {
      // console.log('Entró al ELSE');
      this.showCheckInButton = true;
      this.showNoShowButton = true;
      this.showCheckOutButton = true;
      this.showBreakButton = true;
    }
  }
  // Verifica el estado de selección y alterna la selección de las filas
  toggleSelection() {
    const isChecked = this.isAllSelected();
    // console.log('Estado de los checkboxes: ', isChecked);  
    this.dataSource.filteredData.forEach(row => {
      if (row.status !== 'No show') {
        isChecked ? this.selection.deselect(row) : this.selection.select(row);
      }
    });
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

  toggleModalAprove() {
    console.log("this.dataEmployees:", this.dataEmployees);
    this.isModalAproveOpen = !this.isModalAproveOpen;
    if (this.dataEmployees && this.dataEmployees.data) {
        this.approveChecked = this.dataEmployees.data.approvedStatus || false;
        this.modalAproveComments = this.dataEmployees.data.approveComments || '';
    }
  }

  async saveModalAprove() {
    this.isSaving = true;
   
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); 
    try {
      const dataToUpdate = {
        approveComments: this.modalAproveComments,
        approvedStatus: this.approveChecked,
        approverEmail: this.dataUser.email,
        approverName: `${this.dataUser.firstname} ${this.dataUser.lastname}`,
        approvedDate: formattedDate
      };

      await this.ordSvc.updateOrder(this.orderId, dataToUpdate).toPromise();
      // console.log('Orden actualizada correctamente');

      // Cerrar el modal después de la actualización
      this.updateDataOrder()
      this.toggleModalAprove();

    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      // Manejar el error según sea necesario
    }finally {
      this.isSaving = false; // Finaliza el estado de carga
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
    // public exampleDatabase: EmployeesService,
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
      // this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];

    // this.exampleDatabase.getAllEmployeess();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        console.log(" this.employeesArrayJJr",  this.employeesArray)
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
