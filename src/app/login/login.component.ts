import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  providers: [AuthService],
  host: {
    class: 'login-page app'
  }
})
export class Login {
  constructor(
		private authService: AuthService
  ) {}

  ngOnInit() {
		this.authService.login();      
    }

}
