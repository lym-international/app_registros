import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareScheduledTimeService {

  private hourFormattedSubject = new BehaviorSubject<any>('No Data');
  hourFormatted$ = this.hourFormattedSubject.asObservable();

  shareHourFormatted(hourFormatted: Date) {
    this.hourFormattedSubject.next(hourFormatted);
    //console.log('scheduleTime en el servicio: ', this.hourFormattedSubject)
  }
}
