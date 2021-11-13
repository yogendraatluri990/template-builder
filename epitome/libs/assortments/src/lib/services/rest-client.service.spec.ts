import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RestClient } from './rest-client.service';

describe('RestClientService', () => {
  let service: RestClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RestClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
