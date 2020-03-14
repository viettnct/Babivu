import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './common/http.service';
import { ApiApplication, paging } from 'app/config/app.config';
import { ApiService } from './common/api.service';
import { RsLogin } from '../model/body/rs-login.model';

@Injectable()
export class LoginService extends ApiService {
    constructor(http: HttpService, _router: Router ) { 
        super(ApiApplication.login, http, _router);
    }

    getLogin(login: RsLogin) {
        return this.post(ApiApplication.login, login);
    }
    
}
