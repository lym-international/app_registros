export class LeaveBalance {
  id: number;
  img: string;
  name: string;
  prev: string;
  current: string;
  total: string;
  used: string;
  accepted: string;
  rejected: string;
  expired: string;
  carryOver: string;

  constructor(leaves: LeaveBalance) {
    {
      this.id = leaves.id || this.getRandomID();
      this.img = leaves.img || 'assets/images/user/usrbig1.jpg';
      this.name = leaves.name || '';
      this.prev = leaves.prev || '';
      this.current = leaves.current || '';
      this.total = leaves.total || '';
      this.used = leaves.used || '';
      this.accepted = leaves.accepted || '';
      this.rejected = leaves.rejected || '';
      this.expired = leaves.expired || '';
      this.carryOver = leaves.carryOver || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
