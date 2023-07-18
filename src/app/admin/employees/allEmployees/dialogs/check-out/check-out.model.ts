import { formatDate } from '@angular/common';
export class CheckOutModel {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  details: string;

  constructor(checkOut: CheckOutModel) {
    {
      this.id = checkOut.id || '';
      this.title = checkOut.title || '';
      this.category = checkOut.category || '';
      this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      //this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.details = checkOut.details || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}