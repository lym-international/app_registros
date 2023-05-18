import { formatDate } from '@angular/common';
export class Employees {
  id: number;
  img: string;
  name: string;
  email: string;
  date: string;
  role: string;
  mobile: string;
  department: string;
  degree: string;
  constructor(employees: Employees) {
    {
      this.id = employees.id || this.getRandomID();
      this.img = employees.img || 'assets/images/user/user1.jpg';
      this.name = employees.name || '';
      this.email = employees.email || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.role = employees.role || '';
      this.mobile = employees.mobile || '';
      this.department = employees.department || '';
      this.degree = employees.degree || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
