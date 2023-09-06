import { TestBed } from '@angular/core/testing';

import { CheckoutValidatorService } from './checkout-validator.service';

describe('CheckoutValidatorService', () => {
  let service: CheckoutValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
