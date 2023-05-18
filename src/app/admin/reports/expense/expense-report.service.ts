import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExpenseReport } from './expense-report.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class ExpenseReportService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/expense-report.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<ExpenseReport[]> = new BehaviorSubject<
    ExpenseReport[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: ExpenseReport;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): ExpenseReport[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllLeavess(): void {
    this.subs.sink = this.httpClient
      .get<ExpenseReport[]>(this.API_URL)
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
}
