import { formatDate } from '@angular/common';
export class CheckOutAdminEmployeesModel {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  details: string;

  constructor(checkOutAdminEmployees: CheckOutAdminEmployeesModel) {
    {
      this.id = checkOutAdminEmployees.id || '';
      this.title = checkOutAdminEmployees.title || '';
      this.category = checkOutAdminEmployees.category || '';
      this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      //this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.details = checkOutAdminEmployees.details || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}