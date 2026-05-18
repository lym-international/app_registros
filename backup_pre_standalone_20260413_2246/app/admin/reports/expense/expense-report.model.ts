export class ExpenseReport {
  id: number;
  img: string;
  name: string;
  date: string;
  expense: string;
  status: string;
  amount: string;
  pmode: string;
  paidTo: string;
  invoiceNo: string;

  constructor(leaves: ExpenseReport) {
    {
      this.id = leaves.id || this.getRandomID();
      this.img = leaves.img || 'assets/images/user/usrbig1.jpg';
      this.name = leaves.name || '';
      this.date = leaves.date || '';
      this.expense = leaves.expense || '';
      this.status = leaves.status || '';
      this.amount = leaves.amount || '';
      this.pmode = leaves.pmode || '';
      this.paidTo = leaves.paidTo || '';
      this.invoiceNo = leaves.invoiceNo || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
