import { formatDate } from '@angular/common';
export class Tickets {
  id: number;
  ticket_id: string;
  createdBy: string;
  subject: string;
  status: string;
  assignTo: string;
  date: string;
  details: string;
  constructor(ticket: Tickets) {
    {
      this.id = ticket.id || this.getRandomID();
      this.ticket_id = ticket.ticket_id || '';
      this.createdBy = ticket.createdBy || '';
      this.subject = ticket.subject || '';
      this.status = ticket.status || '';
      this.assignTo = ticket.assignTo || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.details = ticket.details || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
