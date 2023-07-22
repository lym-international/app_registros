import { formatDate } from '@angular/common';
export class Employees {
  id: number;  //Plantilla
  lastName:string;
  firstName: string;
  highKeyId:string;
  payRollId:string;
  position:string;
  horaAcordada:string;
  in:string;
  out:string;
  break:string; 
  totalHours:string;
  // id: number;  //Plantilla
  // img: string;  //Plantilla
  // highKeyID: string; //Diego
  // name: string; //Plantilla
  // position: string;  //Diego
  // totalHours: string;  //Diego
  // payRollID: string;  //Diego
  // in: string;   //Diego
  // out: string;  //Diego
  // break: string; //Diego
  // email: string; //Plantilla
  // date: string;  //Plantilla
  // role: string;   //Plantilla
  // mobile: string; //Plantilla
  // department: string;   //Plantilla
  // degree: string;  //Plantilla
  constructor(employees: Employees) {
    {

     
      this.id = employees.id || this.getRandomID();
      this.firstName = employees.firstName || '';
      this.lastName = employees.lastName || '',
      this.highKeyId = employees.highKeyId || '',
      this.position = employees.position || '',
      this.totalHours = employees.totalHours || '',
      this.payRollId = employees.payRollId || '',
      this.horaAcordada = employees.horaAcordada || '',
      this.in = employees.in || '';
      this.out = employees.out || '';
      this.break = employees.break || '';

     /*  this.id = employees.id || this.getRandomID();
      this.img = employees.img || 'assets/images/user/user1.jpg';
      this.highKeyID = employees.highKeyID || '';
      this.name = employees.name || '';
      this.position = employees.position || '';
      this.totalHours = employees.totalHours || '';
      this.payRollID = employees.payRollID || '';
      this.in = employees.in || '';
      this.out = employees.out || '';
      this.break = employees.break || '';
      this.email = employees.email || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.role = employees.role || '';
      this.mobile = employees.mobile || '';
      this.department = employees.department || '';
      this.degree = employees.degree || ''; */
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
