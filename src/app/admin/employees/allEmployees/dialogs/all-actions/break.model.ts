//import { formatDate } from '@angular/common';
export class BreakModel {
  //id: string;
  break: number;
  //title: string;
  //category: string;
  //startDate: string;
  //endDate: string;
  //details: string;

  constructor(_break: BreakModel) {
    {
      //this.id = break.id || '';
      this.break = _break.break;
      //this.title = break.title || '';
      //this.category = checkIn.category || '';
      //this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      //this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      //this.details = checkIn.details || '';
    }
  }
}