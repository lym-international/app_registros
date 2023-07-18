import { formatDate } from '@angular/common';
export class CheckInModel {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  details: string;

  constructor(checkIn: CheckInModel) {
    {
      this.id = checkIn.id || '';
      this.title = checkIn.title || '';
      this.category = checkIn.category || '';
      //this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.details = checkIn.details || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}