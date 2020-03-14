import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CustomValidators } from 'ng2-validation'
import { MatTableDataSource, MatPaginator } from '@angular/material'
import { lsReceiptTopupService } from 'app/services/is-receipt-topup.service'
import { ReceiptTopup } from '../../../model/receipt-topup.model'
import * as _ from 'lodash'
import { MenuFromServer } from 'app/model/menu-from-server.model'
import { CommonService } from 'app/services/common.service'

@Component({
  selector: 'app-console-card',
  templateUrl: './console-card.component.html',
  styleUrls: ['./console-card.component.scss']
})
export class ConsoleCardComponent implements OnInit {
  displayedColumns = [
    'checked',
    'walletName',
    'receiptId',
    'createdUserName',
    'amount',
    'currencyShortDisplay',
    'status',
    'receiptDate',
    'description',
    'depositUserName'
  ]

  ELEMENT_DATA: header[] = []
  dataSource = new MatTableDataSource<header>(this.ELEMENT_DATA)
  private _receiptopup: ReceiptTopup[] = []
  private _detroyItemReceiptTopup: ReceiptTopup[] = [];
  private _lstButton: MenuFromServer[] = []
  values: any
  private _isDetele: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator

  public constructor (
    private _commonServices: CommonService,
    private _receiptTopup: lsReceiptTopupService
  ) {
    this.values = JSON.parse(localStorage.getItem('userData'))
  }

  ngAfterViewInit () {
    this.getLstAction(this.values.userCode, 'wallet-lstopup')
    this.getReceiptTopup(10, 1)
  }

  getReceiptTopup (perPage: number, page: number) {
    var self = this
    this._receiptTopup.getReceiptTopup(perPage, page).subscribe(res => {
      this._receiptopup = res.result.data

      _.forEach(res.result.data, function (value, key) {
        self.ELEMENT_DATA.push({
          checked: false,
          walletName: value.walletName,
          receiptId: value.receiptId,
          createdUserName: value.createdUserName,
          amount: value.amount,
          currencyShortDisplay: value.currencyShortDisplay,
          status: self.getReceiptStatus(value.status),
          receiptDate: value.receiptDate,
          description: value.description,
          depositUserName: value.depositUserName
        })
      })
      this.dataSource.data = self.ELEMENT_DATA
    })
  }

  ngOnInit () {}

  getReceiptStatus (id: number): string {
    switch (id) {
      case 1: {
        return 'chờ xác nhận'
      }
      case 2: {
        return 'xác nhận'
      }
      case 3: {
        return 'hủy'
      }
    }
  }

  onChange (event) {
    var _self = this;
    if(event){
      if(_self._detroyItemReceiptTopup.length === 0)
      _self._detroyItemReceiptTopup.push(event);
      else 
        _.forEach(_self._detroyItemReceiptTopup, function(value, key) {
          if(!_.includes(value, event.receiptId)) 
          _self._detroyItemReceiptTopup.push(event);
          else 
            _.remove(_self._detroyItemReceiptTopup, function(item) { 
              return item.receiptId ===  event.receiptId
            });
        });
    }
  }

  destroyReceiptStatus () {
    var _self = this;
    if(_self._detroyItemReceiptTopup){
      _.forEach(_self._detroyItemReceiptTopup, function(value, key) {
        _self._receiptTopup.destroyReceiptTopup(value.receiptId)
          .subscribe(res => {
            _self._isDetele.push[value.receiptId];
            console.log(_self._isDetele);
          })
      });
      this.dataSource.data = _.filter(_self.ELEMENT_DATA, (v) => !_.includes(_self._isDetele, v.receiptId));
      _self._isDetele = [];
    }
  }

  getLstAction (usercode: number, path: string) {
    this._commonServices.getLstButton(usercode, path).subscribe(res => {
      this._lstButton = res.result.data
    })
  }

  // 20: thêm mới, 21: sửa, 22: duyệt, 23: hủy, 24: in phiếu thu,
  checkingAction (item: MenuFromServer) {
    switch (item.controlId) {
      case 20: {
        // thêm
        console.log('thêm mới')
        break
      }
      case 21: {
        // sửa
        console.log('sửa')
        break
      }
      case 22: {
        // duyệt
        break
      }
      case 23: {
        // xóa
        this.destroyReceiptStatus();
        break
      }
      case 24: {
        //  in phiếu thu
        break
      }
    }
  }
}

export interface header {
  checked: boolean
  walletName: string
  receiptId: number
  createdUserName: string
  amount: string
  currencyShortDisplay: string
  status: string
  receiptDate: string
  description: string
  depositUserName: string
}
