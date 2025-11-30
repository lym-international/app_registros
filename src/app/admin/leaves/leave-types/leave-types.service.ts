import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeaveTypes } from './leave-types.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class LeaveTypesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/leave-types.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<LeaveTypes[]> = new BehaviorSubject<LeaveTypes[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: LeaveTypes;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): LeaveTypes[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllLeavess(): void {
    this.subs.sink = this.httpClient.get<LeaveTypes[]>(this.API_URL).subscribe({
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
