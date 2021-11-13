import {
  Component,
  OnInit,
  Input,
  Inject,
  inject,
  NgModule,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

// --------------------------------------------------------------
// @ importing Angular material modules
// --------------------------------------------------------------
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
// @ importing auth-facade
// tslint:disable-next-line: nx-enforce-module-boundaries
import { AuthFacade, ServiceConfig } from '@auth';

// importing types
import { GRAVATAR_CONFIG, icons } from '../../types';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'assort-side-nav',
  template: `
    <nav class="side-nav mat-elevation-z8">
      <div>
        <img [src]="userImage + _gravatarConfig.Url" class="avatar" />
        <h5 class="user-name">{{ userName }}</h5>
      </div>
      <span
        class="log-out label-text"
        (click)="navigate('/dashboard/templates/template-list')"
        [ngClass]="{ active: _location.path().indexOf('edit') <= -1 }"
      >
        <mat-icon [color]="'default'" class="view-list">
          {{ icons.view_list }}
        </mat-icon>
        T-List
      </span>
      <span class="log-out" (click)="logout()">
        <mat-icon
          color="warn"
          aria-hidden="false"
          aria-label="Example power settings new"
        >
          {{ icons.power_settings_new }}
        </mat-icon>
      </span>
    </nav>
  `,
  styleUrls: ['./side-nav.page.scss'],
})
export class SideNavPage implements OnInit {
  @Input() userImage: string;
  @Input() userName: string;
  public get icons(): typeof icons {
    return icons;
  }
  /**
   *
   * @param {AuthFacade}_authFacade
   * @param {Router} _router
   * @param {Location} _location
   */
  constructor(
    private _authFacade: AuthFacade,
    @Inject(GRAVATAR_CONFIG) public _gravatarConfig: ServiceConfig,
    private _router: Router,
    public _location: Location
  ) {}
  ngOnInit(): void {}
  logout() {
    this._authFacade.logout();
  }
  navigate(route: string) {
    this._router.navigate([route]);
  }
}

// ---------------------------------------------------------
// @NgModule
// ---------------------------------------------------------

@NgModule({
  declarations: [SideNavPage],
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatTooltipModule],
  exports: [SideNavPage],
})
export class SideNavePageModule {}
