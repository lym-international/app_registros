import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Shortlist } from './shortlist.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class ShortlistService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/shortlist.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Shortlist[]> = new BehaviorSubject<Shortlist[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Shortlist;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Shortlist[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllShortlists(): void {
    this.subs.sink = this.httpClient.get<Shortlist[]>(this.API_URL).subscribe({
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
  addShortlist(shortlist: Shortlist): void {
    this.dialogData = shortlist;

    // this.httpClient.post(this.API_URL, shortlist)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = shortlist;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateShortlist(shortlist: Shortlist): void {
    this.dialogData = shortlist;

    // this.httpClient.put(this.API_URL + shortlist.id, shortlist)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = shortlist;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteShortlist(id: number): void {
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
