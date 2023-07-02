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
import { formatDate } from '@angular/common';
import { OrderDataService } from 'app/_services/orderData.service';

@Component({
  selector: 'app-allemployees',
  templateUrl: './allemployees.component.html',
  styleUrls: ['./allemployees.component.scss'],
})
export class AllemployeesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    //'img',
    'name',
    'highKeyID',
    'position',
    'totalHours',
    'payRollID',
    'in',
    'out',
    'break',
    //'department',
    //'role',
    //'degree',
    //'mobile',
    //'email',
    //'date',
    'actions',
  ];
  exampleDatabase?: EmployeesService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Employees>(true, []);
  index?: number;
  id?: number;
  employees?: Employees;
  public dataEmployees!: any;
  employeesData: any[] = [];
  public orderId!: string;
  

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public employeesService: EmployeesService,
    private snackBar: MatSnackBar,
    private orderDataService: OrderDataService
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit() {
    this.loadData();
    this.dataEmployees = this.orderDataService.getSelectedOrder();
    console.log('Data: ', this.dataEmployees)
    this.orderId = this.dataEmployees.id;
    this.getEmployees()
    
  }
  

  
  getEmployees(){
    fetch(
      `https://us-central1-highkeystaff.cloudfunctions.net/registrations/registbyOrder/orderId?orderId=${this.orderId}`
      
      )
    .then((response) => response.json())
    .then((data) => {
      data.employees.forEach((employee)=>{
        console.log('RR: ', employee.employee.data)  
        const positionName = employee.position;
        const hourFrom = employee.hourFrom;
      }
      )    
    }
    )
  }

  refresh() {
    this.loadData();
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
    this.index = i;
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
    });
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
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
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
    // key name with space add in brackets
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
    public _sort: MatSort
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
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((employees: Employees) => {
            const searchStr = (
              employees.name +
              employees.position +
              employees.totalHours +
              employees.payRollID +
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
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
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
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'highKeyID':
          [propertyA, propertyB] = [a.highKeyID, b.highKeyID]; //Diego
          break;
        case 'position':
          [propertyA, propertyB] = [a.position, b.position]; //Diego
          break;  
        case 'totalHours':
          [propertyA, propertyB] = [a.totalHours, b.totalHours]; //Diego
          break;  
        case 'payRollID':
          [propertyA, propertyB] = [a.payRollID, b.payRollID]; //Diego
          break;  
        case 'in':
          [propertyA, propertyB] = [a.in, b.in]; //Diego
          break;  
        case 'out':
          [propertyA, propertyB] = [a.out, b.out]; //Diego
          break;  
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        case 'date':
          [propertyA, propertyB] = [a.date, b.date];
          break;
        case 'time':
          [propertyA, propertyB] = [a.department, b.department];
          break;
        case 'mobile':
          [propertyA, propertyB] = [a.mobile, b.mobile];
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
