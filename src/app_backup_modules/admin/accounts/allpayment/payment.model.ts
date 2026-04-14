export class Payment {
  id: number;
  cName: string;
  eName: string;
  charges: string;
  tax: string;
  date: string;
  discount: string;
  total: string;
  constructor(payment: Payment) {
    {
      this.id = payment.id || this.getRandomID();
      this.cName = payment.cName || '';
      this.eName = payment.eName || '';
      this.charges = payment.charges || '';
      this.tax = payment.tax || '';
      this.date = payment.date || '';
      this.discount = payment.discount || '';
      this.total = payment.total || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
