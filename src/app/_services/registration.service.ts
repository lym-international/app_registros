import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private orderFunctionsURL = (location.hostname === 'localhost')
  ? 'https://us-central1-highkeystaff.cloudfunctions.net/registrations'
  : 'https://us-central1-highkeystaff.cloudfunctions.net/registrations'
     
    // 'https://us-central1-highkeystaff.cloudfunctions.net/registrations'
   
    // : 'https://us-central1-highkeystaff-test.cloudfunctions.net/registrations';


  constructor(private http: HttpClient) { }

  getRegistrationsByOrder(orderId: string) {
    const apiUrl = `${this.orderFunctionsURL}/registbyOrder/orderId?orderId=${orderId}`;
    return this.http.get<any>(apiUrl);
  }

  getEmployees(orderId: string): Observable<any[]> {
    const url = `${this.orderFunctionsURL}/registbyOrder/orderId?orderId=${orderId}`;
    return this.http.get<any[]>(url);
  }

  getRegistration(orderId: string): Observable<{ employees: any[] }> {
    const url = `${this.orderFunctionsURL}/registbyOrder/orderId?orderId=${orderId}`;
    return this.http.get<{ employees: any[] }>(url);
  }

  updateRegistration(orderId: string, employeesArray: any[]): Observable<any> {
    const apiUrl = `${this.orderFunctionsURL}/registbyOrder/orderId?orderId=${orderId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(apiUrl, { employees: employeesArray }, { headers });
  }
  
}

