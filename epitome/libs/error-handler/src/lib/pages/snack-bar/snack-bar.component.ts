import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'epitome-snack-bar',
  template: `
    <h5 class="error-snack">
      {{ _data.message }}
    </h5>
  `,
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  /**
   *
   * @param {MAT_SNACK_BAR_DATA} data
   */
  constructor(@Inject(MAT_SNACK_BAR_DATA) public _data: Error) {}

  ngOnInit(): void {}
}
