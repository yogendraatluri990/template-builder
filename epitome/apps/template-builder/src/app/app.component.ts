import { Component } from '@angular/core';
@Component({
  selector: 'tb-root',
  template: `
    <div class="backgroud-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .background-container {
        width: 100%;
      }
    `,
  ],
})
export class AppComponent {
  title = 'template-builder';
}
