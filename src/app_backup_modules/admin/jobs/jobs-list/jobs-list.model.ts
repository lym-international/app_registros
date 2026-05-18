import { formatDate } from '@angular/common';
export class JobsList {
  id: number;
  title: string;
  status: string;
  date: string;
  role: string;
  vacancies: string;
  department: string;
  jobType: string;
  constructor(jobsList: JobsList) {
    {
      this.id = jobsList.id || this.getRandomID();
      this.title = jobsList.title || '';
      this.status = jobsList.status || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.role = jobsList.role || '';
      this.vacancies = jobsList.vacancies || '';
      this.department = jobsList.department || '';
      this.jobType = jobsList.jobType || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
