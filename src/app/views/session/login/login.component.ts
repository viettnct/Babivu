import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import { LoginService } from 'app/services/login.service';
import { RsLogin } from 'app/model/body/rs-login.model';

@Component({
   selector: 'ms-login-session',
   templateUrl:'./login-component.html',
   styleUrls: ['./login-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
	
  email: string;
  password: string;

  constructor(
    private router: Router,
    private _login: LoginService
  ) { }

  login() {
    const account: RsLogin = {
      username: this.email,
      password: this.password
    }
    this._login.getLogin(account).subscribe( res => {
      // go to dashboard
      this.router.navigate(['/admin-tool']);
      // console.log(res.result.data);
      localStorage.setItem('token', JSON.stringify(res.result.data.token));
      localStorage.setItem('userData', JSON.stringify(res.result.data.userData));
      localStorage.setItem('lUserSettings', JSON.stringify(res.result.data.lUserSettings));
      localStorage.setItem('userLevel', JSON.stringify(res.result.data.userLevel));
      localStorage.setItem('lMenu', JSON.stringify(res.result.data.lMenu));
    })
  }
	
}



