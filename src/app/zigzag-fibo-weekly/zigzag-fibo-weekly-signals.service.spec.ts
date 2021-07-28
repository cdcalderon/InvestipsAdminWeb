import { TestBed } from '@angular/core/testing';

import { ZigzagFiboWeeklySignalsService } from './zigzag-fibo-weekly-signals.service';

describe('ZigzagFiboWeeklySignalsService', () => {
  let service: ZigzagFiboWeeklySignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZigzagFiboWeeklySignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
