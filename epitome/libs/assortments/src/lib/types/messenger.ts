export interface MessengerData  {
    message: any,
    icon: string,
}
export interface Messenger {
    Duration?: number;
    Data?:MessengerData;
    panelClass?: Array<string>;
    verticalPosition?: 'top' | 'bottom';
    horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
}