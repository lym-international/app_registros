import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private orderFunctionsURL = (location.hostname === 'localhost')
    ? 'http://127.0.0.1:5001/highkeystaff/us-central1/registrations'
    : 'https://us-central1-highkeystaff.cloudfunctions.net';

  constructor(private http: HttpClient) { }

  getRegistrationsByOrder(orderId: string) {
    const apiUrl = `${this.orderFunctionsURL}/registbyOrder/orderId?orderId=${orderId}`;
    return this.http.get<any>(apiUrl);
  }
  
}

