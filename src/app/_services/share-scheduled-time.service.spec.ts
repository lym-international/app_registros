import { TestBed } from '@angular/core/testing';

import { ShareScheduledTimeService } from './share-scheduled-time.service';

describe('ShareScheduledTimeService', () => {
  let service: ShareScheduledTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareScheduledTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
