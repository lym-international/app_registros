import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService{

  private orderFunctionsURL: string;

  constructor(private http: HttpClient) { 
    this.orderFunctionsURL = (location.hostname === 'localhost')
      // ?'https://us-central1-highkeystaff.cloudfunctions.net/orders'
      ?'http://127.0.0.1:5001/highkeystaff/us-central1/orders'
      : 'https://us-central1-highkeystaff.cloudfunctions.net/orders';
  }
  
  
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrders`);
  }

  getOrderByHKid(hkId: string): Observable<any[]> {
    console.log("HkIk", hkId)
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrdersByEmployee?hkId=${hkId}`);
  }

  getOrdersByUser(user: string, hkId: string): Observable<any[]> {
    let url = `${this.orderFunctionsURL}/getOrdersByEmployee?email=${user}`;
    if (hkId) {
      url = `${this.orderFunctionsURL}/getOrdersByEmployee?hkId=${hkId}`;
    }
    return this.http.get<any[]>(url);
  }

  getOrdersBySupervisor(user: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrdersByUser/user?user=${user}`);
  }

  getSearchOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrders`);
  }

  getSearchOrdersByEmp(hkId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrdersByEmployee?hkId=${hkId}`);
  }

  getSearchOrdersBySuperv(user: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrdersByUser/user?user=${user}`);
  }

  
  getOrdersByClient(client: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderFunctionsURL}/getOrdersByClient?client=${client}`);
  }
  

  verifyConcurrency(empleado: any, horaInicio: string, duracionHoras: number, startDate: string): Observable<boolean> {
    const apiUrl = `${this.orderFunctionsURL}/getOrdersByStartDate?date=${startDate}`;
    return this.http.get<any[]>(apiUrl).pipe(
      map(ordenes => {
        const dateStart = new Date(`${startDate}T${horaInicio}`);
        const dateEnd = this.addHours(duracionHoras, dateStart);

        for (const orden of ordenes) {
          const ordenItems = orden.data.items;
          for (const item of ordenItems) {
            const empleados = item.employees;
            if (empleados) {
              const empleadoEnOrden = empleados.find(emp => (emp.id ? emp.id === empleado.id : emp.data.employeeId === empleado.employeeId));
              if (empleadoEnOrden) {
                const fechaInicioOrden = new Date(`${orden.data.startDate}T${horaInicio}`);
                const duracionHorasOrden = item.hours;
                const fechaFinOrden = this.addHours(duracionHorasOrden, fechaInicioOrden);

                const [horas, minutos] = horaInicio.split(':');
                const [year, month, day] = orden.data.startDate.split('-');
                const fechaInicioOrden1 = new Date(Number(year), Number(month) - 1, Number(day), Number(horas), Number(minutos), 0);

                if (
                  (dateStart >= fechaInicioOrden1 && dateStart < fechaFinOrden) || 
                  (dateEnd > fechaInicioOrden1 && dateEnd <= fechaFinOrden)
                ) {
                  return true; // Hay conflicto de horario
                }
              }
            }
          }
        }

        return false; // No hay conflicto de horario
      })
    );
  }

  private addHours(hours: number, date: Date): Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  }

  closeOrder(orderId: string, userEmail: string): Observable<any> {
    const apiUrl = `${this.orderFunctionsURL}/order/close?id=${orderId}&updatedBy=${userEmail}`;
    return this.http.put(apiUrl, null);
  }

  updateOrder(orderId: string, updatedData: any): Observable<any> {
    const apiUrl = `${this.orderFunctionsURL}/order/id?id=${orderId}`;
    return this.http.put(apiUrl, updatedData.data); // Asegúrate de enviar solo updatedData.data
  }
  
  updateOrder1(orderId: string, updatedData: any): Observable<any> {
    // console.log("orden llega al servicio", updatedData)
    const apiUrl = `${this.orderFunctionsURL}/order/id?id=${orderId}`;
    return this.http.put(apiUrl, updatedData);
  }

  getOrderById(orderId: string): Observable<any> {
    const apiUrl = `${this.orderFunctionsURL}/order/id?id=${orderId}`;
    return this.http.get<any>(apiUrl);
  }
  fetchOrderData(orderId: string): Observable<any> {
    const apiUrl = `${this.orderFunctionsURL}/order/id?id=${orderId}`;
    return this.http.get<any>(apiUrl);
  }
  
}
