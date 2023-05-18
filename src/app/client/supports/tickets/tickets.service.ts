import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Tickets } from './tickets.model';
@Injectable()
export class TicketsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/tickets.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Tickets[]> = new BehaviorSubject<Tickets[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Tickets;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Tickets[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getTicketss(): void {
    this.subs.sink = this.httpClient.get<Tickets[]>(this.API_URL).subscribe({
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
  addTicket(ticket: Tickets): void {
    this.dialogData = ticket;

    // this.httpClient.post(this.API_URL, ticket)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = ticket;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateTicket(ticket: Tickets): void {
    this.dialogData = ticket;

    // this.httpClient.put(this.API_URL + ticket.id, ticket)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = ticket;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteTicket(id: number): void {
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
