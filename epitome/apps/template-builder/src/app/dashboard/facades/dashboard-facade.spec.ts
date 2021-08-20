import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { DashboardFacade } from './dashboard-facade';

describe('DashboarFacadeService', () => {
  let service: DashboardFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
    });
    service = TestBed.inject(DashboardFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
