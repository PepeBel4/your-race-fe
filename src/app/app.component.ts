/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth/auth.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './scss/application.scss'
  ],
  template: `<router-outlet></router-outlet>`
})
export class App {
  constructor(public auth: AuthService) {
   	auth.handleAuthentication();
  }
}
