import { formatDate } from '@angular/common';
export class AllHoliday {
  id: number;
  hName: string;
  shift: string;
  details: string;
  date: string;
  location: string;
  constructor(holiday: AllHoliday) {
    {
      this.id = holiday.id || this.getRandomID();
      this.hName = holiday.hName || '';
      this.shift = holiday.shift || '';
      this.details = holiday.details || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.location = holiday.location || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
