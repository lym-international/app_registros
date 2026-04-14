import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareStartDateService {
  private dateStartData: any[] = [];

  setDateStartData(data: any[]) {
    this.dateStartData = data;
  }

  getDateStartData(): any[] {
    return this.dateStartData;
  }


  
}
