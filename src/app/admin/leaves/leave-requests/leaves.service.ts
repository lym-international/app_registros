import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Leaves } from './leaves.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class LeavesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/leaves.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Leaves[]> = new BehaviorSubject<Leaves[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Leaves;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Leaves[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllLeavess(): void {
    this.subs.sink = this.httpClient.get<Leaves[]>(this.API_URL).subscribe({
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
  addLeaves(leaves: Leaves): void {
    this.dialogData = leaves;

    // this.httpClient.post(this.API_URL, leaves)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = leaves;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateLeaves(leaves: Leaves): void {
    this.dialogData = leaves;
    // this.httpClient.put(this.API_URL + leaves.id, leaves)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = leaves;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteLeaves(id: number): void {
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
