import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Candidates } from './candidates.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class CandidatesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/candidates.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Candidates[]> = new BehaviorSubject<Candidates[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Candidates;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Candidates[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCandidatess(): void {
    this.subs.sink = this.httpClient.get<Candidates[]>(this.API_URL).subscribe({
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
  addCandidates(candidates: Candidates): void {
    this.dialogData = candidates;

    // this.httpClient.post(this.API_URL, candidates)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = candidates;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateCandidates(candidates: Candidates): void {
    this.dialogData = candidates;

    // this.httpClient.put(this.API_URL + candidates.id, candidates)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = candidates;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteCandidates(id: number): void {
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
