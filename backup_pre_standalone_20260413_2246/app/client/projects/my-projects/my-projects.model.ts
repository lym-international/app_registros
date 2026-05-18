import { formatDate } from '@angular/common';
export class MyProjects {
  id: number;
  pName: string;
  type: string;
  open_task: string;
  last_modify: string;
  create_date: string;
  status: string;
  lead_name: string;
  constructor(myProjects: MyProjects) {
    {
      this.id = myProjects.id || this.getRandomID();
      this.pName = myProjects.pName || '';
      this.type = myProjects.type || '';
      this.open_task = myProjects.open_task || '';
      this.last_modify = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.create_date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.status = myProjects.status || '';
      this.lead_name = myProjects.lead_name || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
