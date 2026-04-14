export class Estimates {
  id: number;
  eNo: string;
  cName: string;
  estDate: string;
  expDate: string;
  country: string;
  amount: string;
  status: string;
  details: string;
  constructor(estimates: Estimates) {
    {
      this.id = estimates.id || this.getRandomID();
      this.eNo = estimates.eNo || '';
      this.cName = estimates.cName || '';
      this.estDate = estimates.estDate || '';
      this.country = estimates.country || '';
      this.amount = estimates.amount || '';
      this.expDate = estimates.expDate || '';
      this.status = estimates.status || '';
      this.details = estimates.details || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
