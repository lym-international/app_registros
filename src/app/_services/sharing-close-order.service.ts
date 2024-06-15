import { Injectable } from '@angular/core';
import { Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingCloseOrderService {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  private statusOrderSubject = new Subject<string>();

  setStatusOrder(status: string) {
    this.statusOrderSubject.next(status);
    console.log('SETstatusOrder en el SERVICIO: ',status)
  }

  getStatusOrderObservable(): Observable<string> {
    console.log('statusOrder en el SERVICIO: ',this.statusOrderSubject)
    return this.statusOrderSubject.asObservable();
  }
}
