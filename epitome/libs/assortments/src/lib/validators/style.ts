import { AbstractControl } from '@angular/forms';

export function validateStyle(
  control: AbstractControl
): { [keys: string]: boolean } | null {
  const styleRegExp: RegExp = new RegExp(
    /((?:^\s*)([\w#.@*,:\-.:>,*\s]+)\s*{(?:[\s]*)((?:[A-Za-z\-\s]+[:]\s*['"0-9\w .,\/()\-!%,\/[/\]]+;?)*)*\s*}(?:\s*))/im
  );
  const squareBrackets: RegExp = new RegExp(/\[\[([A-Z]+)+(?:_[A-Z]+)*\]\]/gmi);  
  if (
    control.value !== null &&
    control.value !== '' &&
    !styleRegExp.test(control.value)
  ) {
    return { isInValid: true };
  } else {
    if (
      control.value !== null &&
      control.value === '' &&
      styleRegExp.test(control.value)
    )
      return null;
  }
}
