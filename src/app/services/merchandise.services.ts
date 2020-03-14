import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from './common/http.service';
import {ApiApplication} from 'app/config/app.config';
import {ApiService} from './common/api.service';
import {Merchandise} from '../model/merchandise.model';

@Injectable()
export class MerchandiseServices extends ApiService {
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.merchandise.controller, http, _router);
    }

    getMerchandiseViewModel(orderCode: string, perPage, page) {
        const param = '?orderCode=' + orderCode + '&perPage=' + perPage + '&page=' + page;
        return this.get(this.apiBaseController + ApiApplication.merchandise.getMerchandiseViewModel + param);
    }

    getStatus() {
        return this.get(ApiApplication.system.controller + '/' + ApiApplication.system.getOrderStatus);
    }

    saveMerchandise(data: Merchandise) {
        return this.post(this.apiBaseController + ApiApplication.merchandise.addMerchandise, data);
    }

    deleteMerchandise(merchandiseIds: number[]) {
        return this.delete(this.apiBaseController + ApiApplication.merchandise.deleteMerchandise, merchandiseIds);
    }

    getMerchandiseHistory(merchandiseId: number, perPage, page) {
        const param = '?merchandiseId=' + merchandiseId + '&perPage=' + perPage + '&page=' + page;
        return this.get(this.apiBaseController + ApiApplication.merchandise.getMerchandiseHistory +  param);
    }

    completeMerchandise(orderCode) {
        return this.put(ApiApplication.order.controller + '/' + ApiApplication.order.completeAddMerchandise + orderCode);
    }
}
