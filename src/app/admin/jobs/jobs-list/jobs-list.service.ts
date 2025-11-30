import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobsList } from './jobs-list.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class JobsListService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/jobs-list.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<JobsList[]> = new BehaviorSubject<JobsList[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: JobsList;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): JobsList[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllJobsLists(): void {
    this.subs.sink = this.httpClient.get<JobsList[]>(this.API_URL).subscribe({
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
  addJobsList(jobsList: JobsList): void {
    this.dialogData = jobsList;

    // this.httpClient.post(this.API_URL, jobsList)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = jobsList;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateJobsList(jobsList: JobsList): void {
    this.dialogData = jobsList;

    // this.httpClient.put(this.API_URL + jobsList.id, jobsList)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = jobsList;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteJobsList(id: number): void {
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
