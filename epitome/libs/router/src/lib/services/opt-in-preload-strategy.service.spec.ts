import { TestBed } from '@angular/core/testing';

import { OptInPreloadStrategyService } from './opt-in-preload-strategy.service';

describe('OptInPreloadStrategyService', () => {
  let service: OptInPreloadStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptInPreloadStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
