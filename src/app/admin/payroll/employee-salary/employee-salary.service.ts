import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeSalary } from './employee-salary.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class EmployeeSalaryService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/employee-salary.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<EmployeeSalary[]> = new BehaviorSubject<
    EmployeeSalary[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: EmployeeSalary;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): EmployeeSalary[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllEmployeeSalarys(): void {
    this.subs.sink = this.httpClient
      .get<EmployeeSalary[]>(this.API_URL)
      .subscribe({
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
  addEmployeeSalary(employeeSalary: EmployeeSalary): void {
    this.dialogData = employeeSalary;

    // this.httpClient.post(this.API_URL, employeeSalary)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = employeeSalary;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateEmployeeSalary(employeeSalary: EmployeeSalary): void {
    this.dialogData = employeeSalary;

    // this.httpClient.put(this.API_URL + employeeSalary.id, employeeSalary)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = employeeSalary;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteEmployeeSalary(id: number): void {
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
