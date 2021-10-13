export interface ErrorMessage {
  error: Error;
  className: string;
  horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right';
  verticalPosition: 'top' | 'bottom';
}
