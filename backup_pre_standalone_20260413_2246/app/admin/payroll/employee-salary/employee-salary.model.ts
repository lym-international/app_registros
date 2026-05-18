export class EmployeeSalary {
  id: number;
  img: string;
  name: string;
  email: string;
  payslip: string;
  role: string;
  empID: string;
  department: string;
  salary: string;
  constructor(employeeSalary: EmployeeSalary) {
    {
      this.id = employeeSalary.id || this.getRandomID();
      this.img = employeeSalary.img || 'assets/images/user/user1.jpg';
      this.name = employeeSalary.name || '';
      this.email = employeeSalary.email || '';
      this.payslip = employeeSalary.payslip || '';
      this.role = employeeSalary.role || '';
      this.empID = employeeSalary.empID || '';
      this.department = employeeSalary.department || '';
      this.salary = employeeSalary.salary || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
