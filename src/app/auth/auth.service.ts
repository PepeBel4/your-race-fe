// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'UbgKLj2VnE6RxklPVPwl7XRKNgZmmmWS',
    domain: 'your-race.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:3001',
    redirectUri: 'http://localhost:3000',      
    scope: 'openid profile read:messages'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {

    console.log("are we authenticated?");
    console.log(this.isAuthenticated());

    if (!this.isAuthenticated()) {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.setSession(authResult);
          this.router.navigate(['']);
        } else if (err) {
          this.router.navigate(['']);
        } else {
          this.login();
        }
      });
    }
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log("EXPIRES AT");
    console.log(expiresAt);
    console.log("CURRENTLY WE ARE");
    console.log(new Date().getTime());
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

}