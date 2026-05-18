export class Shortlist {
  id: number;
  img: string;
  name: string;
  title: string;
  mobile: string;
  download: string;
  role: string;
  email: string;
  jobType: string;
  constructor(shortlist: Shortlist) {
    {
      this.id = shortlist.id || this.getRandomID();
      this.img = shortlist.img || 'assets/images/user/user1.jpg';
      this.name = shortlist.name || '';
      this.title = shortlist.title || '';
      this.mobile = shortlist.mobile || '';
      this.download = shortlist.download || '';
      this.role = shortlist.role || '';
      this.email = shortlist.email || '';
      this.jobType = shortlist.jobType || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
