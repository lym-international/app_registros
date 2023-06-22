import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  private selectedOrder: any;

  setSelectedOrder(order: any) {
    this.selectedOrder = order;
  }

  getSelectedOrder() {
    return this.selectedOrder;
  }
}