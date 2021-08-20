import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

import { Inline } from '../types';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[inlineEditor]',
})
export class InlineEditorDirective {
  @Input() public designName: string;
  @Input() public designId: number;
  @Output() public updatedValue: EventEmitter<
    Inline<number, string>
  > = new EventEmitter<Inline<number, string>>();
  /**
   * @param {ElementRef} _currentEleRef
   */

  constructor(private _currentEleRef: ElementRef) {}
  @HostListener('blur')
  onBlur() {
    if (
      typeof this._currentEleRef.nativeElement.innerText !== 'undefined' &&
      this._currentEleRef.nativeElement.innerText
    ) {      
      const currentDesignName: Inline<number, string> = {
        key: this.designId,
        currentValue: this._currentEleRef.nativeElement.innerText || this.designName,
        previousValue: this.designName
      };
      this.updatedValue.emit(currentDesignName);
    }
  }
}
