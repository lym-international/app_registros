import { TestBed } from '@angular/core/testing';

import { SharingCloseOrderService } from './sharing-close-order.service';

describe('SharingCloseOrderService', () => {
  let service: SharingCloseOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharingCloseOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
