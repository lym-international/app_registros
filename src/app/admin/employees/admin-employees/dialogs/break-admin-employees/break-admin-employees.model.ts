//import { formatDate } from '@angular/common';
export class BreakAdminEmployeesModel {
    //id: string;
    break: number;
    //title: string;
    //category: string;
    //startDate: string;
    //endDate: string;
    //details: string;
  
    constructor(_break: BreakAdminEmployeesModel) {
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
    public getRandomID(): number {
      const S4 = () => {
        return ((1 + Math.random()) * 0x10000) | 0;
      };
      return S4() + S4();
    }
  }