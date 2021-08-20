import { Directive, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

// importing types
import { LoginRequest } from '../../types';

// importing facades
import { AuthFacade } from '../../facades';
@Directive()
export abstract class BaseLoginComponent implements OnInit {
  public loginForm: FormGroup = this.getLoginForm();
  public hidePassword = true;
  /**
   *
   * @param {FormBuilder} _formBuilder
   * @param {AuthFacade} _authFacade
   * @param {ActivatedRoute} _route
   */

  constructor(private _formBuilder: FormBuilder,private _authFacade: AuthFacade, private _route: ActivatedRoute) {}

  // ---------------------------------------------
  // @ Lifecycle hooks
  // ---------------------------------------------
  ngOnInit() {}

  getLoginForm(): FormGroup {
    return this._formBuilder.group({
      asi_number: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      app_group: [null, []],
      appCode: ['SITA', []],
      appVersion: ['3.0.0', []],
      kick: ['1', []],
      invoke: [null, []],
      rememberMe: [false, []]
    });
  }

  // ------------------------------------------------------------------
  // @ Public Methods
  // ------------------------------------------------------------------
  /**
   *  Login with credentials
   * @param {string}redirectUrl
   */
  loginWithCredentials(redirectUrl?: string): void {
    const req = this.loginForm.value as LoginRequest;    
    this._authFacade.loginWithCredentials(req, redirectUrl);
  }
}
