import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeaveReport } from './leave-report.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class LeaveReportService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/leave-report.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<LeaveReport[]> = new BehaviorSubject<
    LeaveReport[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: LeaveReport;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): LeaveReport[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllLeavess(): void {
    this.subs.sink = this.httpClient
      .get<LeaveReport[]>(this.API_URL)
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
