import {Component, OnInit, Inject} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PaymentOrder} from '../../model/payment-order.model';
import {OrderData} from '../../model/ro/order-detail.model';

@Component({
    selector: 'app-payment-orders',
    templateUrl: './payment-orders.component.html',
    styleUrls: ['./payment-orders.component.scss']
})
export class PaymentOrdersComponent implements OnInit {
    orderIds: number[];
    password: string;
    order: OrderData[] = [];
    isDisable = false;
    loading = false;
    messages = [];
    passInvalid = false;
    paymentData: PaymentOrder = new PaymentOrder();
    adminAccount = 'admin';

    constructor(
        private orderService: OrderService,
        @Inject(MAT_DIALOG_DATA) private dialogData: any,
        private dialogRef: MatDialogRef<PaymentOrdersComponent>,
    ) {
    }

    ngOnInit() {
        if (this.dialogData.orderIds) {
            this.orderIds = this.dialogData.orderIds;
            if (this.orderIds.length > 0) {
                if (this.orderIds.length === 1) {
                    this.loadOrderInfo(this.orderIds[0]);
                } else {
                    this.loadOrderInfoByIds(this.orderIds);
                }
            }
        } else {
            this.showMessage('alert-danger', 'Không thể lấy thông tin đơn hàng');
            this.isDisable = true;
        }
    }

    paymentOrder() {
        if (this.password) {
            this.loading = true;
            this.isDisable = true;
            this.paymentData.lId = this.orderIds;
            this.paymentData.loginData.username = this.adminAccount;
            this.paymentData.loginData.password = this.password;
            this.orderService.payListOrder(this.paymentData).toPromise()
                .then((res) => {
                    this.loading = false;
                    if (res.result.success) {
                        this.dialogRef.close(res);
                    } else {
                        this.isDisable = false;
                        this.showMessage('alert-danger', 'Không thể thanh toán đơn hàng');
                    }
                }).catch(() => {
                this.loading = false;
                this.isDisable = false;
                this.showMessage('alert-danger', 'Không thể thanh toán đơn hàng');
            })
        } else {
            this.passInvalid = true;
        }
    }

    loadOrderInfo(orderId: number) {
        this.loading = true;
        this.orderService.getOrderViewModelById(orderId).toPromise()
            .then((res) => {
                this.loading = false;
                if (res.result.success) {
                    if (res.result.data) {
                        this.order.push(res.result.data);
                    } else {
                        this.showMessage('alert-danger', 'Không thể lấy thông tin đơn hàng');
                        this.isDisable = true;
                    }
                } else {
                    this.showMessage('alert-danger', res.result.message);
                    this.isDisable = true;
                }
            }).catch(() => {
            this.showMessage('alert-danger', 'Không thể lấy thông tin đơn hàng');
            this.isDisable = true;
            this.loading = false;
        });
    }

    /**
     * Show message
     * @param messageClass = bootstrap alert class
     * @param detail
     */
    showMessage(messageClass: string, detail: string): void {
        this.messages = [];
        this.messages.push({messageClass: messageClass, detail});
        setTimeout(() => {
            this.messages = [];
        }, 3000);
    }

    private loadOrderInfoByIds(orderIds: number[]) {
        this.loading = true;
        this.orderService.getLsOrderPay(orderIds).toPromise()
            .then((res) => {
                this.loading = false;
                if (res.result.success) {
                    if (res.result.data) {
                        this.order = res.result.data;
                    } else {
                        this.showMessage('alert-danger', 'Không thể lấy thông tin đơn hàng');
                        this.isDisable = true;
                    }
                } else {
                    this.showMessage('alert-danger', res.result.message);
                    this.isDisable = true;
                }
            }).catch(() => {
            this.loading = false;
            this.isDisable = true;
            this.showMessage('alert-danger', 'Không thể lấy thông tin đơn hàng');
        });
    }

    /**
     * Get total missing
     * @return number
     */
    getTotal(): number {
        let total = 0;
        for (const order of this.order) {
            total += order.missing;
        }
        return total;
    }
}
