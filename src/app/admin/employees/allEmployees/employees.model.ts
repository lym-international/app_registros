import { formatDate } from '@angular/common';
export class Employees {
  id: number;  //Plantilla
  lastName:string;
  firstName: string;
  highKeyId:string;
  payRollId:string;
  position:string;
  hourFrom:string;
  in:string;
  dateCheckin: { _seconds: number; _nanoseconds: number };
  dateCheckinRounded: { _seconds: number; _nanoseconds: number };
  dateCheckout:  { _seconds: number; _nanoseconds: number };   
  dateCheckoutRounded:{ _seconds: number; _nanoseconds: number };
  out:string;
  break:string; 
  totalHours:string;
  orderId: string;
  hours: number;
  employee: {   // Agregar la propiedad 'employee' como un objeto
    agmRate: number;
    booking: string;
    data: {
      firstname: string;
      gender: string;
      phone: string;
      company: string;
      employeeId: number;
      positions: { rate: number; name: string }[];
      email: string;
      lastname: string;
      status: string;
      // Otras propiedades de 'data' si es necesario
    };
    rate: number;
    id: string;
    favourite: string;
    status: string;
    // Otras propiedades de 'employee' si es necesario
  };
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
      this.hourFrom = employees.hourFrom || '',
      this.in = employees.in || '',
      this.dateCheckin = employees.dateCheckin ,
      this.out = employees.out || '';
      this.break = employees.break || '';
      this.orderId=employees.orderId || '';
      this.hours=employees.hours || 0;

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
