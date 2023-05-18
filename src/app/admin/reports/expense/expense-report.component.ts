import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExpenseReportService } from './expense-report.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ExpenseReport } from './expense-report.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss'],
})
export class ExpenseReportComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  filterToggle = false;
  displayedColumns = [
    'invoiceNo',
    'date',
    'expense',
    'img',
    'amount',
    'pmode',
    'status',
    'paidTo',
  ];

  exampleDatabase?: ExpenseReportService;
  dataSource!: ExampleDataSource;
  id?: number;
  leaves?: ExpenseReport;
  constructor(
    public httpClient: HttpClient,
    public leavesService: ExpenseReportService
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  ngOnInit() {
    this.loadData();
  }
  toggleStar(row: ExpenseReport) {
    console.log(row);
  }

  public loadData() {
    this.exampleDatabase = new ExpenseReportService(this.httpClient);
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
}
export class ExampleDataSource extends DataSource<ExpenseReport> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ExpenseReport[] = [];
  renderedData: ExpenseReport[] = [];
  constructor(
    public exampleDatabase: ExpenseReportService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ExpenseReport[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllLeavess();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((leaves: ExpenseReport) => {
            const searchStr = leaves.name.toLowerCase();
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
    //disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: ExpenseReport[]): ExpenseReport[] {
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
        case 'status':
          [propertyA, propertyB] = [a.status, b.status];
          break;
        case 'amount':
          [propertyA, propertyB] = [a.amount, b.amount];
          break;
        case 'pmode':
          [propertyA, propertyB] = [a.pmode, b.pmode];
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
