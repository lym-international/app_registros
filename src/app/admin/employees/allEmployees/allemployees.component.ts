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
    'horaAcordada',
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
    'actions',
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
  // saca la data que se necesita por empleado según la orden.
  
  getEmployees(){
    fetch(
      `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`
      
      )
    .then((response) => response.json())
    .then((data) => {
    this.isTblLoading = false;
      //const employeesArray = []; // Diego: Array para guardar los datos
      //this.employeesDatos = employeesArray;
      
      //console.log('employeesDatos: ', this.employeesDatos)

      data.employees.forEach((employee)=>{
        // console.log('RR: ', employee.employee.data)  
        //const positionName = employee.position;
        //const hourFrom = employee.hourFrom || "No data";
        const firstName = employee.employee.data.firstname || "No data"; //Diego: si no tiene valor (undefined) imrime "No data".
        const lastName = employee.employee.data.lastname || "No data";
        const highKeyId = employee.employee.data.employeeId || "No data";
        const position = employee.position || "No data";
        const totalHours = employee.hours || "No data";
        const payrollId = employee.employee.data.payrollid || "No data";
        const brake = employee.break || "No data";
        const horaAcordada = employee.hourFrom || "No data";
        
        /*const horaAcordadaTimestamp = employee.realCheckin?._seconds || 0; // Obtener el timestamp de entrada en segundos
        const horaAcordadaDate = new Date(horaAcordadaTimestamp * 1000); // Multiplicar por 1000 para convertir segundos a milisegundos
        const horaAcordadaInTime = this.datePipe.transform(horaAcordadaDate, 'hh:mm a');
        */

        const checkInTimestamp = employee.realCheckin?._seconds || 0; // Obtener el timestamp de entrada en segundos
        const checkInDate = new Date(checkInTimestamp * 1000); // Multiplicar por 1000 para convertir segundos a milisegundos
        const checkInTime = this.datePipe.transform(checkInDate, 'hh:mm a');
        
        const checkOutTimestamp = employee.dateCheckoutRounded?._seconds || 0; // Obtener el timestamp de entrada en segundos
        const checkOutDate = new Date(checkOutTimestamp * 1000); // Multiplicar por 1000 para convertir segundos a milisegundos
        const checkOutTime = this.datePipe.transform(checkOutDate, 'hh:mm a');
        console.log('data empleados: ', employee)
        
        // Diego: this.employeesArray.push agrega los datos al array employeesArray
        
        this.employeesArray.push({
          firstName: firstName,
          lastName: lastName,
          highKeyId: highKeyId,
          //position: lastPosition,
          position: position,
          totalHours: totalHours,
          payRollId: payrollId,
          horaAcordada: horaAcordada,
          in: checkInTime,
          out: checkOutTime,
          break: brake,
          //hourFrom: hourFrom,
        });
      });

      this.employeesService.setEmployeesApi(this.employeesArray)
  
        //console.log('Datass: ', this.employeesArray)
      // Diego: ejecución con el array de datos
      console.log('---------------------------');
      console.log('Array empleados: ');
     console.log(this.employeesArray);
     console.log('---------------------------');

     this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, this.employeesArray);
    })
    .catch((error) => {
      console.log(error)
      this.isTblLoading = false;
    })  
    
  }

  
  refresh() {
    // this.loadData();
  }

  getSelectedRow(): Employees | null {
    const selectedRows = this.selection.selected;
    if (selectedRows.length === 1) {
      return selectedRows[0];
    }
    return null;
  }
  onActionButtonClick() {
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
      console.log('Objetos seleccionados para check-in:', selectedRows);
      const dialogRef = this.dialog.open(CheckInComponent, {
        data: {
          employees: this.employees,
          action: 'add',
        },
      });
      
      const result = await dialogRef.afterClosed().toPromise();
      //console.log('Result:', result);
      this.showNotification(
        'snackbar-success',
        'Successful CheckIn...!!!',
        'bottom',
        'center'
      );
      const timestamp = Timestamp.fromDate(new Date(result));
      console.log('TimeStamp: ', timestamp)
      const checkInTimestamp = timestamp?.seconds || 0; // Obtener el timestamp de entrada en segundos
      const checkInDate = new Date(checkInTimestamp * 1000); // Multiplicar por 1000 para convertir segundos a milisegundos
      const checkInTime = this.datePipe.transform(checkInDate, 'hh:mm a');
      console.log('TIME CHECKIN: ',checkInTime)
      
      selectedRows.forEach((row) => {
        row.in = checkInTime;
      });

      this.doCheckIn(selectedRows); // Llama a la función doCheckIn() para realizar cualquier otra acción necesaria
    } else {
      console.log('Ningún objeto seleccionado para check-in.');
    }
  }
  
  doCheckIn(selectedRows: Employees[]) {
    // Lógica para realizar cualquier otra acción necesaria después del check-in con los objetos seleccionados
    // ...
  
    // Luego de realizar las acciones necesarias, actualiza los datos en el dataSource
    console.log('Objetos seleccionados después de actualizar:', selectedRows);
    this.dataSource.data = this.employeesArray.slice();
  }

  async checkOutModal(selectedRows: Employees[]) {
    if (selectedRows.length > 0) {
      console.log('Objetos seleccionados para check-out:', selectedRows);
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
      //console.log('Result:', result);
      const timestamp = Timestamp.fromDate(new Date(result));
      console.log('TimeStamp: ', timestamp)
      const checkOutTimestamp = timestamp?.seconds || 0; // Obtener el timestamp de entrada en segundos
      const checkOutDate = new Date(checkOutTimestamp * 1000); // Multiplicar por 1000 para convertir segundos a milisegundos
      const checkOutTime = this.datePipe.transform(checkOutDate, 'hh:mm a');
      console.log('TIME CHECKOUT: ',checkOutTime)
      
      selectedRows.forEach((row) => {
        row.out = checkOutTime;
      });

      this.doCheckOut(selectedRows); // Llama a la función doCheckIn() para realizar cualquier otra acción necesaria
    } else {
      console.log('Ningún objeto seleccionado para check-in.');
    }
  }
  
  doCheckOut(selectedRows: Employees[]) {
    // Lógica para realizar cualquier otra acción necesaria después del check-in con los objetos seleccionados
    // ...
  
    // Luego de realizar las acciones necesarias, actualiza los datos en el dataSource
    console.log('Objetos seleccionados después de actualizar:', selectedRows);
    this.dataSource.data = this.employeesArray.slice();
  }

  async breakModal(selectedRows: Employees[]) {
    let tempDirection: Direction;
    const dialogRef = this.dialog.open(BreakComponent, {
      data: {
        employees: this.employees,
        action: 'add',
      },
      direction: tempDirection,
    });
    const result = await dialogRef.afterClosed().toPromise();
    console.log('Result break: ', result)
    this.showNotification(
      'snackbar-success',
      'Successful break...!!!',
      'bottom',
      'center'
    );
    selectedRows.forEach((row) => {
      row.break = result.break;
    });
    this.doBreak(selectedRows);
  }
  doBreak(selectedRows: Employees[]) {
    // Lógica para realizar cualquier otra acción necesaria después del check-in con los objetos seleccionados
    // ...
  
    // Luego de realizar las acciones necesarias, actualiza los datos en el dataSource
    console.log('Objetos seleccionados después de actualizar:', selectedRows);
    this.dataSource.data = this.employeesArray.slice();
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
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  
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
              employees.firstName +
              employees.lastName +
              employees.position +
              employees.totalHours +
              employees.payRollId +
              employees.horaAcordada +
              employees.in +
              employees.out +
              employees.break 
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
        //  this.renderedData = this.employeesArray.slice(startIndex, this.paginator.pageSize);
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
          case 'horaAcordada':
            [propertyA, propertyB] = [a.horaAcordada, b.horaAcordada]; //Diego
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
