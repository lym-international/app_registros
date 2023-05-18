import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeaveBalance } from './leave-balance.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class LeaveBalanceService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/leave-balance.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<LeaveBalance[]> = new BehaviorSubject<
    LeaveBalance[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: LeaveBalance;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): LeaveBalance[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllLeavess(): void {
    this.subs.sink = this.httpClient
      .get<LeaveBalance[]>(this.API_URL)
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
