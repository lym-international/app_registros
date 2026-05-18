import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareTimeDifferenceInMinutesService {

  constructor() { }

  private timeDifference: number;

  setTimeDifference(minutes: number) {
    this.timeDifference = minutes;
  }

  getTimeDifference() {
    return this.timeDifference;
  }
}
