import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { MessengerData, Material_Modules } from '../../types';

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
  constructor(@Inject(MAT_SNACK_BAR_DATA) public _data: MessengerData) {
    console.log(this._data);
  }
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
