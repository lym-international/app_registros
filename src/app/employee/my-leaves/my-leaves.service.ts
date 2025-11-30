import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MyLeaves } from './my-leaves.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class MyLeavesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/empLeaveReq.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<MyLeaves[]> = new BehaviorSubject<MyLeaves[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: MyLeaves;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): MyLeaves[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllMyLeaves(): void {
    this.subs.sink = this.httpClient.get<MyLeaves[]>(this.API_URL).subscribe({
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
  addMyLeaves(myLeaves: MyLeaves): void {
    this.dialogData = myLeaves;

    // this.httpClient.post(this.API_URL, myLeaves)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = myLeaves;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateMyLeaves(myLeaves: MyLeaves): void {
    this.dialogData = myLeaves;

    // this.httpClient.put(this.API_URL + myLeaves.id, myLeaves)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = myLeaves;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteMyLeaves(id: number): void {
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
