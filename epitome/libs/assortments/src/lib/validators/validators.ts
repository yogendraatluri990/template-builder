import { AbstractControl } from '@angular/forms';

export function validateStyle(
  control: AbstractControl
): { [keys: string]: boolean } | null {
  const styleRegExp: RegExp = new RegExp(
    /((?:^\s*)([\w#.@*,:\-.:>,*\s]+)\s*{(?:[\s]*)((?:[A-Za-z\-\s]+[:]\s*['"0-9\w .,\/()\-!%,\/[/\]]+;?)*)*\s*}(?:\s*))/im
  );
  const squareBrackets: RegExp = new RegExp(/\[\[([A-Z]+)+(?:_[A-Z]+)*\]\]/gim);
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

export function validateHex(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const regHex: RegExp = new RegExp(
    /^#((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6}|[A-Fa-f0-9]{3})$/gi
  );
  if (
    control.value !== null &&
    control.value !== '' &&
    !regHex.test(control.value)
  ) {
    return {
      isInValid: true,
    };
  } else {
    if (
      control.value !== null &&
      control.value === '' &&
      regHex.test(control.value)
    )
      return null;
  }
}
