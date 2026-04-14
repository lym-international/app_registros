/*
import { formatDate } from '@angular/common';
export class CheckInAdminEmployeesModel {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  details: string;

  constructor(checkInAdminEmployees: CheckInAdminEmployeesModel) {
    {
      this.id = checkInAdminEmployees.id || '';
      this.title = checkInAdminEmployees.title || '';
      this.category = checkInAdminEmployees.category || '';
      //this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.details = checkInAdminEmployees.details || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
*/