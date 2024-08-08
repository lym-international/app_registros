import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private userFunctionsURL = (location.hostname === 'localhost')
    // ? 'https://us-central1-highkeystaff.cloudfunctions.net/users'
    ?'http://127.0.0.1:5001/highkeystaff-test/us-central1/users'
    : 'https://us-central1-highkeystaff-test.cloudfunctions.net/users';

    
  constructor(private http: HttpClient) { }

  updateEmployee(employeeData: any): Observable<any> {
    const url = `${this.userFunctionsURL}/updateEmployee/id?id=${employeeData.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, employeeData, { headers });
  }

  getLastEmployeeID(): Observable<any> {
    const url = `${this.userFunctionsURL}/getLastEmployeeID`;
    return this.http.get<any>(url);
  }

  createEmployee(newEmployee: any): Observable<any> {
    const url = `${this.userFunctionsURL}/addEmployee`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, newEmployee, { headers });
  }

  searchEmployeeByType(searchType: string, value: string): Observable<any> {
    const endpointMap = {
      highKeyId: `${this.userFunctionsURL}/getEmployeeById/id?id=${value}`,
      payroll: `${this.userFunctionsURL}/getEmployeeByPayroll/payroll?payroll=${value}`,
      firstName: `${this.userFunctionsURL}/getEmployeesByFN/firstName?firstName=${value}`,
      lastName: `${this.userFunctionsURL}/getEmployeesByLN/lastName?lastName=${value}`
    };
    const url = endpointMap[searchType];
    return this.http.get<any>(url);
  }

}



