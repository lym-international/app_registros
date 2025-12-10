import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  private selectedOrderSubject = new Subject<any>()
  private storageKey = 'selectedOrder';

  setSelectedOrder(order: any) {    
    localStorage.setItem(this.storageKey, JSON.stringify(order));
    this.selectedOrderSubject.next(order);
    // console.log("llamando al servicio", order);
  }
  getSelectedOrder() {
    const order = localStorage.getItem(this.storageKey);
    return order ? JSON.parse(order) : null;
  }
  getSelectedOrderObservable(): Observable<any> {
    return this.selectedOrderSubject.asObservable();
  }
  clearSelectedOrder() {
    localStorage.removeItem(this.storageKey); // Remueve la orden seleccionada del almacenamiento local
    this.selectedOrderSubject.next(null); // Notifica que la orden seleccionada ha sido eliminada
  }
}