import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ShipManagerService} from 'app/services/ship-manager.service';
import {ClientProfile} from 'app/model/client-profile.model';
import {ShipOrders} from 'app/model/ship-orders.model';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {PaymentOrdersComponent} from '../../payment-orders/payment-orders.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  ELEMENT_DATA: ShipOrders[] = [];

  displayedColumns: string[] = ['position', 'name', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource: MatTableDataSource<ShipOrders>;
  private account: ClientProfile;
  private _shipOrders: ShipOrders;

  constructor(private _shipManager: ShipManagerService,
              private router: Router,
              public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.account = JSON.parse(localStorage.getItem('userData'));
    this._shipOrders = new ShipOrders();
    this.dataSource = new MatTableDataSource<ShipOrders>();
  }
  ngAfterViewInit() {
    this.getAllOrders();
  }

  public getAllOrders() {
    const _self = this;
    _self._shipManager.getAllOrders(_self.account.userId).subscribe(res => {
      _self._shipOrders = res.result.data;
        _self.dataSource.data = res.result.data;
    })
  }

  redirect() {
    this.router.navigate(['/ship-manager/detail-orders']);
  }

    payment(id) {
        const data = {
            orderIds : [id],
        };
        this.dialog.open(PaymentOrdersComponent, {
            data: data,
            panelClass: 'payment-order-dialog',
        }).afterClosed().subscribe((res) => {
            if (res) {
                console.log(res);
            }
        });
    }
}
