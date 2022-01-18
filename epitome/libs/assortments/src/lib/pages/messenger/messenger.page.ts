import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Material_Modules, MessengerData } from '../../types';

@Component({
  template: `
    <span class="snack">
      {{ _data.message }}
    </span>
    <mat-icon
      aria-hidden="false"
      aria-label="Example home icon"
      style="position:absolute; top: 50%; transform:translateY(-56.4%); margin:auto 5px;"
      >{{ this._data.icon }}</mat-icon
    >
  `,
  styleUrls: ['./messenger.page.scss'],
})
export class MessengerPage {
  /**
   *
   * @param {MAT_SNACK_BAR_DATA} _data
   */
  constructor(@Inject(MAT_SNACK_BAR_DATA) public _data: MessengerData) {}
}

// ----------------------------------
// @NgModule
// ----------------------------------

@NgModule({
  declarations: [MessengerPage],
  imports: [CommonModule, ...Material_Modules],
  exports: [MessengerPage],
  entryComponents: [MessengerPage],
})
export class MessengerModule {}
