import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './common/http.service';
import { ApiApplication, paging } from 'app/config/app.config';
import { ApiService } from './common/api.service';

@Injectable()
export class ShipManagerService extends ApiService {
    constructor(http: HttpService, _router: Router ) { 
        super(ApiApplication.shipManager.controller, http, _router);
    }
    
    getAllOrders(userId: number) {
        return this.get(ApiApplication.shipManager.controller 
            + ApiApplication.shipManager.allOrder + '?'
            + ApiApplication.userId + '= '+userId + '&'
            + ApiApplication.perPage +'= 10' + '&'
            + ApiApplication.page + '= 1');
    }
    
}
