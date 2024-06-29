import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingCloseOrderService {
  private statusOrderSubject = new Subject<string>();
  private orderIdSubject = new Subject<string>();

  private currentOrderId: string | undefined;
  private currentStatusOrder: string | undefined;

  setStatusOrder(status: string) {
    this.currentStatusOrder = status;
    this.statusOrderSubject.next(status);
    console.log('SETstatusOrder en el SERVICIO: ', status);
  }

  getStatusOrderObservable(): Observable<string> {
    return this.statusOrderSubject.asObservable();
  }

  getStatusOrder(): string | undefined {
    return this.currentStatusOrder;
  }

  setOrderId(orderId: string) {
    this.currentOrderId = orderId;
    this.orderIdSubject.next(orderId);
    console.log('ORDER ID QUE LLEGA', orderId);
  }

  getOrderIdObservable(): Observable<string> {
    return this.orderIdSubject.asObservable();
  }

  getOrderId(): string | undefined {
    return this.currentOrderId;
  }
}
