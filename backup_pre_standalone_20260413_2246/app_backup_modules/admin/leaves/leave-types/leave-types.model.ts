import { formatDate } from '@angular/common';
export class LeaveTypes {
  id: number;
  img: string;
  leave_name: string;
  type: string;
  leave_unit: string;
  status: string;
  note: string;

  constructor(leaves: LeaveTypes) {
    {
      this.id = leaves.id || this.getRandomID();
      this.img = leaves.img || 'assets/images/user/usrbig1.jpg';
      this.leave_name = leaves.leave_name || '';
      this.type = leaves.type || '';
      this.leave_unit = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.status = leaves.status || '';
      this.note = leaves.note || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
