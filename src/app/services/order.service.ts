import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './common/api.service';
import { HttpService } from './common/http.service';
import { ApiApplication } from 'app/config/app.config';
import {OrderBuy} from '../model/body/order-buy.model';
import {PaymentOrder} from '../model/payment-order.model';

@Injectable()
export class OrderService extends ApiService {
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.order.controller, http, _router);
    }

    getOrderViewModelById(id: number) {
        const param = '?orderId=' + id;
        return this.get(this.apiBaseController + ApiApplication.order.getOrderViewModelById + param);
    }

    payListOrder(data: PaymentOrder) {
        return this.put(this.apiBaseController + ApiApplication.order.payListOrder, data);
    }

    getOrderBuy(orderId: number) {
        return this.get(this.apiBaseController + ApiApplication.order.getOrderBuy + orderId);
    }

    saveOrderAfterBuy(orderBuy: OrderBuy) {
        return this.put(this.apiBaseController + ApiApplication.order.saveOrderAfterBuy, orderBuy);
    }

    completedBuyOrder(orderBuy: OrderBuy) {
        return this.put(this.apiBaseController + ApiApplication.order.completedBuyOrder, orderBuy);
    }

    startBuy(orderId: number) {
        const param = '?orderId=' + orderId;
        return this.put(this.apiBaseController + ApiApplication.order.startBuy + param);
    }

    getLsOrderPay(orderIds: number[]) {
        return this.get(this.apiBaseController + ApiApplication.order.getLsOrderPay, orderIds);
    }
}
