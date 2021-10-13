export interface Inline<n, s> {
  /**
   * 'n' represents number
   * 's' represents string
   */
  key: n;
  currentValue: s;
  previousValue: s;
}
