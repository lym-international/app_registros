import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  private storageKey = 'selectedOrder';

  setSelectedOrder(order: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(order));
    //console.log("llamando al servicio", order);
  }

  getSelectedOrder() {
    const order = localStorage.getItem(this.storageKey);
    return order ? JSON.parse(order) : null;
  }
}