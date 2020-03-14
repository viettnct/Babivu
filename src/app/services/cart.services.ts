import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './common/http.service';
import { ApiApplication, paging } from 'app/config/app.config';
import { ApiService } from './common/api.service';
import { ProductServicesOption } from 'app/model/product-services-option.model';
import { AllLstCart } from 'app/model/lstCart.model';
import * as _ from 'lodash';

@Injectable()
export class CartServices extends ApiService {
    constructor(http: HttpService, _router: Router ) { 
        super(ApiApplication.cart.controller, http, _router);
    }

    getAllServicesOption() {
        return this.get(ApiApplication.cart.controller + ApiApplication.cart.lstAllServicesOption )
        .map(rs => {
            rs.result.data.map((item:ProductServicesOption) => {
                item.isChecked = false;
            })
            return rs.result.data;
        });
    }

    // api/cart/getListCart/?userId=1&perPage=10&page=1
    getAllItemsListCart(userId: number, perPage: number, page: number) {
        return this.get(ApiApplication.cart.controller + ApiApplication.cart.lstCart + '?'
                        + ApiApplication.userId + '=' + userId + '&'
                        + ApiApplication.perPage + '=' + perPage + '&'
                        + ApiApplication.page + '=' + page);
    }
    
    //CalFeeInCart/?lServiceId=1&lCartId=19: // add services
    callFeeServicesInCart(lServiceId: number, lCartId: number) {
        return this.post(ApiApplication.cart.controller + ApiApplication.cart.addFeeServices + '?'
                        + ApiApplication.lServiceId + '=' + lServiceId + '&'
                        + ApiApplication.lCartId + '=' + lCartId);
    }
    
    //api/Cart/deleteCartServiceById/11 // remove services
    delFeeServicesInCart(lCartServiceId: number) {
        return this.deleteWithParams(ApiApplication.cart.controller + ApiApplication.cart.delPriceServices, lCartServiceId);
    }
    
    // api/Cart/deleteShopItem/11  // xóa shop items
    delShopItem(lCartItemId: number) {
        return this.deleteWithParams(ApiApplication.cart.controller + ApiApplication.cart.deleteShopItem, lCartItemId);
    }

    // xóa shop
    //api/Cart/deleteShop/11
    delShop(lCartId: number) {
        return this.deleteWithParams(ApiApplication.cart.controller + ApiApplication.cart.deleteShop, lCartId);
    }
    
}
