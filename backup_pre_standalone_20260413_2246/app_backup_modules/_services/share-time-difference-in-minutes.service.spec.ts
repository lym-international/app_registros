import { TestBed } from '@angular/core/testing';

import { ShareTimeDifferenceInMinutesService } from './share-time-difference-in-minutes.service';

describe('ShareTimeDifferenceInMinutesService', () => {
  let service: ShareTimeDifferenceInMinutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareTimeDifferenceInMinutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
