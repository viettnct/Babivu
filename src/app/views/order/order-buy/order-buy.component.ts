import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderBuy} from '../../../model/body/order-buy.model';
import {ChatDTO} from '../../../model/dto/chat.model';
import {OrderService} from '../../../services/order.service';
import {OrderChat} from '../../../model/ro/order-detail.model';
import {OrderDetailService} from '../../../services/order-detail.service';
import {FormGroupDirective} from '@angular/forms';
import {LService} from '../../../model/lservice.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-order-buy',
    templateUrl: './order-buy.component.html',
    styleUrls: ['./order-buy.component.scss']
})
export class OrderBuyComponent implements OnInit {
    @ViewChild('orderByForm') orderByForm: FormGroupDirective;
    orderBuy: OrderBuy = new OrderBuy();
    chatContent: ChatDTO = new ChatDTO();
    messages = [];
    orderId: number;
    messageSend: string;
    dataChat: OrderChat[] = [];
    inlandFee: number;
    inlandFeeType = 7;

    constructor(
        private activeRoute: ActivatedRoute,
        private orderService: OrderService,
        private orderDetailService: OrderDetailService,
    ) {
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe(params => {
            if (params.orderid) {
                this.orderId = params.orderid;
                this.getOrderBuy(this.orderId);
            }
        });
    }

    /**
     * Get order buy info
     * @param orderId
     */
    getOrderBuy(orderId) {
        this.orderService.getOrderBuy(orderId).toPromise()
            .then((res) => {
                if (res.result.success) {
                    this.orderBuy = res.result.data;
                    this.dataChat = res.result.data.lsOrderChat;
                    this.sortByDueDate();
                } else {
                    this.showMessage('alert-danger', res.result.message);
                }
            }).catch(() => {
            this.showMessage('alert-danger', 'Không thể tải thông tin đơn hàng');
        });
    }

    public sortByDueDate(): void {
        this.dataChat.sort((a: OrderChat, b: OrderChat) => {
            return new Date(a.chatTime).getTime() - new Date(b.chatTime).getTime();
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

    sendMessage() {
        if (this.messageSend) {
            this.chatContent.orderId = this.orderBuy.orderData.orderId;
            this.chatContent.userId = this.orderBuy.orderData.userId;
            this.chatContent.content = this.messageSend;
            this.messageSend = '';
            const orderMessage = new OrderChat();
            orderMessage.content = this.chatContent.content;
            orderMessage.chatTime = new Date();
            orderMessage.orderId = this.orderBuy.orderData.orderId;
            orderMessage.userId = this.orderBuy.orderData.userId;
            orderMessage.chatName = this.orderBuy.orderData.userName;
            this.orderDetailService.postChat(this.chatContent).toPromise()
                .then(() => {
                    this.dataChat.push(orderMessage);
                })
        }
    }

    prepareDataBeforeSave() {
        const service = new LService();
        service.amount = this.inlandFee;
        service.feeType = this.inlandFeeType;
        this.orderBuy.lsService = [...this.orderBuy.lsService, service];
    }

    /**
     * Save order
     */
    saveOrderForm() {
        this.prepareDataBeforeSave();
        this.orderService.saveOrderAfterBuy(this.orderBuy).toPromise()
            .then((res) => {
                if (res.result.success) {
                    this.showMessage('alert-success', 'Lưu đơn hàng thành công');
                } else {
                    this.showMessage('alert-danger', res.result.message);
                }
            })
            .catch(() => {
                this.showMessage('alert-danger', 'Không thể lưu đơn hàng');
            });
    }

    /**
     * Complete order
     */
    completeOrderForm() {
        this.prepareDataBeforeSave();
        this.orderService.completedBuyOrder(this.orderBuy).toPromise()
            .then((res) => {
                if (res.result.success) {
                    this.showMessage('alert-success', 'Hoàn tất đơn hàng thành công');
                } else {
                    this.showMessage('alert-danger', res.result.message);
                }
            })
            .catch(() => {
                this.showMessage('alert-danger', 'Không thể hoàn tất đơn hàng');
            });
    }

    /**
     * start by order
     */
    startBuy() {
        this.orderService.startBuy(this.orderId).toPromise()
            .then((res) => {
                if (res.result.success) {
                    this.showMessage('alert-success', 'Bắt đầu mua hàng thành công thành công');
                } else {
                    this.showMessage('alert-danger', res.result.message);
                }
            }).catch(() => {
            this.showMessage('alert-danger', 'Không thể bắt đầu mua hàng hàng');
        });
    }
}
