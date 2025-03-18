import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  private selectedOrderSubject = new Subject<any>();
  private storageKey = 'selectedOrder';

  setSelectedOrder(order: any) {  
    sessionStorage.setItem(this.storageKey, JSON.stringify(order));
    this.selectedOrderSubject.next(order);
  }

  getSelectedOrder() {
    const order = sessionStorage.getItem(this.storageKey);
    return order ? JSON.parse(order) : null;
  }

  getSelectedOrderObservable(): Observable<any> {
    return this.selectedOrderSubject.asObservable();
  }

  clearSelectedOrder() {
    sessionStorage.removeItem(this.storageKey); 
    this.selectedOrderSubject.next(null);
  }
}
