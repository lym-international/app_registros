import { formatDate } from '@angular/common';
export class AdminEmployees {
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
  constructor(adminEmployees: AdminEmployees) {
    {

     
      this.id = adminEmployees.id || this.getRandomID();
      this.firstName = adminEmployees.firstName || '';
      this.lastName = adminEmployees.lastName || '',
      this.highKeyId = adminEmployees.highKeyId || '',
      this.position = adminEmployees.position || '',
      this.totalHours = adminEmployees.totalHours || '',
      this.payRollId = adminEmployees.payRollId || '',
      this.hourFrom = adminEmployees.hourFrom || '',
      this.in = adminEmployees.in || '',
      this.dateCheckin = adminEmployees.dateCheckin ,
      this.out = adminEmployees.out || '';
      this.break = adminEmployees.break || '';
      this.orderId=adminEmployees.orderId || '';
      this.hours=adminEmployees.hours || 0;

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
