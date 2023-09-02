import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CheckoutValidatorService {
  private checkOutDate: Date | null = null;
  private checkInDateSubject = new BehaviorSubject<Date | null>(null);
  checkInDate$: Observable<Date | null> = this.checkInDateSubject.asObservable();
  roundedCheckOut: Date;
  roundedCheckIn: Date;
  roundedStartDate: Date;

  constructor() {
    const checkInDateFromLocalStorage = localStorage.getItem('checkInDate');
    if (checkInDateFromLocalStorage) {
      this.roundedCheckIn = new Date(checkInDateFromLocalStorage);
      this.roundedCheckIn.setSeconds(0);
      this.checkInDateSubject.next(this.roundedCheckIn); // Notifica el valor al Observable
    }
  }

  setCheckInDate(date: Date) {
    this.roundedCheckIn = new Date(date);
    this.roundedCheckIn.setSeconds(0);
    localStorage.setItem('checkInDate', this.roundedCheckIn.toISOString()); // Actualiza el localStorage
    this.checkInDateSubject.next(this.roundedCheckIn); // Notifica el valor al Observable
  }

  setCheckOutDate(date: Date) {
    this.checkOutDate = date;
    this.roundedCheckOut = new Date(this.checkOutDate);
    this.roundedCheckOut.setSeconds(0);
  }

  validateDates(): boolean {
    console.log('Datos para comparación')
    console.log('CheckIn: ', this.roundedCheckIn)
    console.log('CheckOut: ', this.roundedCheckOut)
    return this.roundedCheckOut > this.roundedCheckIn;
  }
}



