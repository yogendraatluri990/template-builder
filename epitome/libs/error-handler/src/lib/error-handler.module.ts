import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// local components

import { ErrorSnackService } from './services/error-snack.service';
import { SnackBarComponent } from './pages';

@NgModule({
  declarations: [SnackBarComponent],
  imports: [CommonModule, MatSnackBarModule],
  exports: [SnackBarComponent],
})
export class ErrorHandlerModule {
  public static forRoot(): ModuleWithProviders<ErrorHandlerModule> {
    return {
      ngModule: ErrorHandlerModule,
      providers: [ErrorSnackService],
    };
  }
}
