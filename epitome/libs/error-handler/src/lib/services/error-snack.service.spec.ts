import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ErrorSnackService } from './error-snack.service';

describe('ErrorSnackService', () => {
  let service: ErrorSnackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [MatSnackBar],
    });
    service = TestBed.inject(ErrorSnackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
