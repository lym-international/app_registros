import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Clients } from './clients.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class ClientsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/clients.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Clients[]> = new BehaviorSubject<Clients[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Clients;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Clients[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllClients(): void {
    this.subs.sink = this.httpClient.get<Clients[]>(this.API_URL).subscribe({
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
  addClient(clients: Clients): void {
    this.dialogData = clients;

    // this.httpClient.post(this.API_URL, clients)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = clients;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateClient(clients: Clients): void {
    this.dialogData = clients;

    // this.httpClient.put(this.API_URL + clients.id, clients)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = clients;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteClient(id: number): void {
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
