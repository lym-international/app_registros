import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Estimates } from './estimates.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class EstimatesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/estimates.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Estimates[]> = new BehaviorSubject<Estimates[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Estimates;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Estimates[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllEstimatess(): void {
    this.subs.sink = this.httpClient.get<Estimates[]>(this.API_URL).subscribe({
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
  addEstimates(estimates: Estimates): void {
    this.dialogData = estimates;

    // this.httpClient.post(this.API_URL, estimates)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = estimates;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateEstimates(estimates: Estimates): void {
    this.dialogData = estimates;

    // this.httpClient.put(this.API_URL + estimates.id, estimates)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = estimates;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteEstimates(id: number): void {
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
