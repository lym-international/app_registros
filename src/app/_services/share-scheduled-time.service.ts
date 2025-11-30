import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareScheduledTimeService {
 
    private startDateSubject = new Subject<any>()
    private storageKey = 'scheduleTime';
  
    setScheduleDate(scheduleDate: Date) {
      localStorage.setItem(this.storageKey, scheduleDate.toString()); // Almacena la fecha como cadena directamente
      this.startDateSubject.next(scheduleDate);
      // console.log("llamando al servicio", scheduleDate.toString());
    }
    
    getScheduleDate(): Date | null {
      const scheduleDateStr = localStorage.getItem(this.storageKey);
      if (scheduleDateStr) {
        const scheduleDate = new Date(scheduleDateStr);
        // console.log("scheduleDate en servicio", scheduleDate);
        return scheduleDate;
      } else {
        return null;
      }
    }
    
    getScheduleDateObservable(): Observable<any> {
      return this.startDateSubject.asObservable();
    }
}
