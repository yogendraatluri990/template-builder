import { Injectable, ErrorHandler } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// @importing local component
import { SnackBarComponent } from '../pages';

// importing from types
import { ErrorMessage } from '../types';
@Injectable({
  providedIn: 'root',
})
export class ErrorSnackService implements ErrorHandler {
  constructor(private _snackBar: MatSnackBar) {}

  // -----------------------------------------------------
  // @Private Methods
  // -----------------------------------------------------
  private openSnackBar(data: ErrorMessage) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2500,
      data: data.error,
      panelClass: [data.className],
      verticalPosition: data.verticalPosition,
      horizontalPosition: data.horizontalPosition,
    });
  }
  // -------------------------------------------------------
  // @Public Methods
  // -------------------------------------------------------
  public handleError(error: Error): void {
    const snackBar: ErrorMessage = {
      error: error,
      className: 'error-message',
      horizontalPosition: 'start',
      verticalPosition: 'top',
    };
    this.openSnackBar(snackBar);
  }
}
