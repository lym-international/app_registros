import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employees } from './employees.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class EmployeesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/employees.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Employees[]> = new BehaviorSubject<Employees[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Employees;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Employees[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllEmployeess(): void {
    this.subs.sink = this.httpClient.get<Employees[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  addEmployees(employees: Employees): void {
    this.dialogData = employees;

    // this.httpClient.post(this.API_URL, employees)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = employees;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  
  //Actualizar empleados (no aplica en LyM)
  /*updateEmployees(employees: Employees): void {
    this.dialogData = employees;

    // this.httpClient.put(this.API_URL + employees.id, employees)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = employees;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }*/
  deleteEmployees(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
