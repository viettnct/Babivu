import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CartServices } from 'app/services/cart.services';
import { LstServiceCart } from 'app/model/lstServiceCart.model';
import { AllLstCart } from 'app/model/lstCart.model';
import { ProductServicesOption } from 'app/model/product-services-option.model';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { ItemsOnShop } from 'app/model/items-on-shop.model';
import { ServiceCart } from 'app/model/ServicesCart.model';
declare const stepCustomGUI: any;

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
];


@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class Part1Component implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  private _allServicesCart: ProductServicesOption[];
  private _allItemsCart: AllLstCart[];
  checked: Boolean = true;
  

  constructor(private _cartServices: CartServices) { 
    this._allServicesCart = new Array<ProductServicesOption>();
    this._allItemsCart = new Array<AllLstCart>();
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.getAllItemsOnCart(10, 1);
  }

  // api/cart/getListCart/?userId=1&perPage=5&page=1
  public getAllItemsOnCart(perPage: number, page: number){
    var _self = this;
    _self._cartServices.getAllItemsListCart(1, perPage, page).subscribe( resAll => {
      _self._allItemsCart = resAll.result.data;
      console.log(_self._allItemsCart);
    })
  }

  // remove shop
  removeItemShop(event: ItemsOnShop){
    var _self = this;
    let indexOnShop = _.findIndex(_self._allItemsCart, function(o) { return o.cartId === event.cartId });
    if(_self._allItemsCart[indexOnShop].items.length === 1) {
      // remove shop khi k có item
      _self.removeShop(_self._allItemsCart[indexOnShop].cartId);
    } else {
      let t1 = event.itemId;
      _self._cartServices.delShopItem(event.lCartItemId).subscribe( res => {
        let indexShop = _.findIndex(_self._allItemsCart, function(o) { return o.cartId === event.cartId });
        let indexItemsShop = _.findIndex(_self._allItemsCart[indexShop].items, function(o) { return o.itemId === event.itemId });
        _self._allItemsCart[indexShop].items.splice(indexItemsShop, 1);
      })
    }
  }

  // remove shop
  removeShop(cardId: number){
    var _self = this;
    this._cartServices.delShop(cardId).subscribe( res => {
      _.remove(_self._allItemsCart, function(n) { return n.cartId == cardId });
      }
    )
  }

  oldItemServicesCart: ProductServicesOption;
  showOptions(itemSerices: LstServiceCart, itemCart: AllLstCart) {
    var _self = this;
    let indexShop = _.findIndex(_self._allItemsCart, function(o) { return o.cartId === itemCart.cartId });
    let indexServices = _.findIndex(_self._allItemsCart[indexShop].lstServiceCart, function(o) { return o.serviceId === itemSerices.serviceId });
    if(_self._allItemsCart[indexShop].lstServiceCart[indexServices].isChecked) {
      // remove item
      let priceProduct = itemSerices.amount
      _self._cartServices.delFeeServicesInCart(itemSerices.serviceCartId).subscribe(res => {
        _self.oldItemServicesCart = res.result.data;

        _self._allItemsCart[indexShop].totalPrice = _self._allItemsCart[indexShop].totalPrice - priceProduct;
        _self.oldItemServicesCart = res.result.data;
        _self._allItemsCart[indexShop].lstServiceCart[indexServices].isChecked = false;
      })
    } else {
      // add item
      _self._cartServices.callFeeServicesInCart(itemSerices.serviceId, itemCart.cartId).subscribe( res => {
        _self.oldItemServicesCart = res.result.data;

        _self._allItemsCart[indexShop].totalPrice = _self._allItemsCart[indexShop].totalPrice + _self.oldItemServicesCart.amount;
        _self._allItemsCart[indexShop].lstServiceCart[indexServices].isChecked = true;
      })
    }
  }

}
