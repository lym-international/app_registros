import { Injectable } from '@angular/core';
import { Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingCloseOrderService {

  constructor() { }

  private statusOrderSubject = new Subject<string>();

  setStatusOrder(status: string) {
    this.statusOrderSubject.next(status);
  }

  getStatusOrderObservable(): Observable<string> {
    return this.statusOrderSubject.asObservable();
  }
}
