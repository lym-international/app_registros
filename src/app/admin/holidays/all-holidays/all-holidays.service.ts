import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AllHoliday } from './all-holidays.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class HolidayService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/holidays.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<AllHoliday[]> = new BehaviorSubject<AllHoliday[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: AllHoliday;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AllHoliday[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllHolidays(): void {
    this.subs.sink = this.httpClient.get<AllHoliday[]>(this.API_URL).subscribe({
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
  addHoliday(holiday: AllHoliday): void {
    this.dialogData = holiday;
    // this.httpClient.post(this.API_URL, holiday)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = holiday;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateHoliday(holiday: AllHoliday): void {
    this.dialogData = holiday;
    // this.httpClient.put(this.API_URL + holiday.id, holiday)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = holiday;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteHoliday(id: number): void {
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
