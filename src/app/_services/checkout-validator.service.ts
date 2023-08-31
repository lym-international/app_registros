import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CheckoutValidatorService {
  private checkInDate: Date | null = null;
  private checkOutDate: Date | null = null;
  roundedEndDate: Date;
  roundedStartDate: Date;

  setCheckInDate(date: Date) {
    this.checkInDate = date;
    this.roundedStartDate = new Date(this.checkInDate);
    this.roundedStartDate.setSeconds(0);
  }

  setCheckOutDate(date: Date) {
    this.checkOutDate = date;
    this.roundedEndDate = new Date(this.checkOutDate);
    this.roundedEndDate.setSeconds(0);
  }

  validateDates(): boolean {
    
    return this.roundedEndDate > this.roundedStartDate;
  }

}


