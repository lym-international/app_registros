import { formatDate } from '@angular/common';
export class MyTasks {
  id: number;
  taskNo: string;
  project: string;
  client: string;
  status: string;
  priority: string;
  type: string;
  executor: string;
  date: string;
  details: string;
  constructor(myTasks: MyTasks) {
    {
      this.id = myTasks.id || this.getRandomID();
      this.taskNo = myTasks.taskNo || '';
      this.project = myTasks.project || '';
      this.client = myTasks.client || '';
      this.status = myTasks.status || '';
      this.priority = myTasks.priority || '';
      this.type = myTasks.type || '';
      this.executor = myTasks.executor || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.details = myTasks.details || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
