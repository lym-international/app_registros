export class Candidates {
  id: number;
  img: string;
  name: string;
  title: string;
  mobile: string;
  download: string;
  role: string;
  email: string;
  jobType: string;
  constructor(candidates: Candidates) {
    {
      this.id = candidates.id || this.getRandomID();
      this.img = candidates.img || 'assets/images/user/user1.jpg';
      this.name = candidates.name || '';
      this.title = candidates.title || '';
      this.mobile = candidates.mobile || '';
      this.download = candidates.download || '';
      this.role = candidates.role || '';
      this.email = candidates.email || '';
      this.jobType = candidates.jobType || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
