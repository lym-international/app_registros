import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Resumes } from './resumes.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class ResumesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/resumes.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Resumes[]> = new BehaviorSubject<Resumes[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Resumes;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Resumes[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllResumess(): void {
    this.subs.sink = this.httpClient.get<Resumes[]>(this.API_URL).subscribe({
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
  addResumes(resumes: Resumes): void {
    this.dialogData = resumes;

    // this.httpClient.post(this.API_URL, resumes)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = resumes;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateResumes(resumes: Resumes): void {
    this.dialogData = resumes;

    // this.httpClient.put(this.API_URL + resumes.id, resumes)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = resumes;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteResumes(id: number): void {
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
