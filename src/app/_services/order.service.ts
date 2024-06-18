import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService{

  private orderFunctionsURL: string;

  constructor(private http: HttpClient) { 
    this.orderFunctionsURL = (location.hostname === 'localhost')
      ? 'http://127.0.0.1:5001/highkeystaff/us-central1/orders'
      : 'https://us-central1-highkeystaff.cloudfunctions.net';
  }
  
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrders`);
  }

  getOrderByHKid(hkId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrdersByEmployee?hkId=${hkId}`);
  }

  getOrdersByUser(user: string, hkId: string): Observable<any[]> {
    let url = `${this.orderFunctionsURL}/getOrdersByEmployee?email=${user}`;
    if (hkId) {
      url = `${this.orderFunctionsURL}/getOrdersByEmployee?hkId=${hkId}`;
    }
    return this.http.get<any[]>(url);
  }

  getOrdersBySupervisor(user: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrdersByUser/user?user=${user}`);
  }

  getSearchOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrders`);
  }

  getSearchOrdersByEmp(hkId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrdersByEmployee?hkId=${hkId}`);
  }

  getSearchOrdersBySuperv(user: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrdersByUser/user?user=${user}`);
  }
}







