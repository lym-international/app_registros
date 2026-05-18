export interface Position {
    name: string;
    //totalCheckin: number;
    //totalCheckout: number;
    hours: { [hour: string]: { totalCheckin: number; totalCheckout: number; totalnoShow: number;} };
  }