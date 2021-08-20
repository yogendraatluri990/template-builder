import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { TemplateFacade } from './template-facade';

describe('TemplateFacadeService', () => {
  let service: TemplateFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()]
    });
    service = TestBed.inject(TemplateFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
