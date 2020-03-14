import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import {OrderDetailRO, OrderHistory, Merchandise, Receipt, Complain, OrderChat, LOrderDetail} from 'app/model/ro/order-detail.model';
import {ChatDTO} from 'app/model/dto/chat.model';
import {OrderDetailService} from 'app/services/order-detail.service';
import {PaymentOrdersComponent} from '../../payment-orders/payment-orders.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, AfterViewInit {

    panelOpenState = false;

    customCollapsedHeight = '58px';
    customExpandedHeight = '58px';
    messageSend: string;
    orderId = 16;

    orderDetailRO: OrderDetailRO;
    chatDTO: ChatDTO;

    displayedColumns: string[] = ['content', 'historyDate'];
    displayedColumnsMer: string[] = ['merchandiseCode', 'paymentWeight', 'length', 'statusDisplay', 'changeDate'];
    displayedColumnsRec: string[] = ['receiptDate', 'convertedAmount', 'reasionDisplay', 'description'];
    displayedColumnsCom: string[] = ['complainContent', 'complainSettle', 'statusDisplay', 'createdDate'];
    dataChat: OrderChat[] = [];
    lOrderDetail: LOrderDetail[] = [];

    dataSourceMer: MatTableDataSource<Merchandise>;
    dataSourceRec: MatTableDataSource<Receipt>;
    dataSourceCom: MatTableDataSource<Complain>;
    dataSource: MatTableDataSource<OrderHistory>;

    constructor(private orderDetailService: OrderDetailService,
                public dialog: MatDialog,
                private activeRoute: ActivatedRoute,
    ) {
        this.dataSource = new MatTableDataSource<OrderHistory>();
        this.dataSourceMer = new MatTableDataSource<Merchandise>();
        this.dataSourceRec = new MatTableDataSource<Receipt>();
        this.dataSourceCom = new MatTableDataSource<Complain>();
        this.orderDetailRO = new OrderDetailRO();
        this.chatDTO = new ChatDTO();
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe(params => {
            if (params.orderid) {
                this.orderId = params.orderid;
                this.loadData();
            }
        });
    }

    ngAfterViewInit() {
    }

    loadData() {
        this.orderDetailService.getOrderDetail(this.orderId).subscribe(
            (res) => {
                this.orderDetailRO = res.result.data;
                // this.dataSource = new MatTableDataSource<OrderHistory>(this.orderDetailRO.orderHistory);
                this.dataSource.data = res.result.data.lsOrderHistory;
                res.result.data.lsMerchandise.forEach((v) => v.length = v.length + v.width + v.height)
                // this.dataSourceMer = new MatTableDataSource<Merchandise>(this.orderDetailRO.merchandise);
                this.dataSourceMer.data = res.result.data.lsMerchandise;
                // this.dataSourceRec = new MatTableDataSource<Receipt>(this.orderDetailRO.receipt);
                this.dataSourceRec.data = res.result.data.lsReceipt;
                // this.dataSourceCom = new MatTableDataSource<Complain>(this.orderDetailRO.complain);
                this.dataSourceCom.data = res.result.data.lsComplain;
                this.dataChat = res.result.data.lsOrderChat;
                this.sortByDueDate();
                this.lOrderDetail = res.result.data.lsOrderDetail;
                console.log(res.result.data.lsService.length);
            }
        )
    }

    public sortByDueDate(): void {
        this.dataChat.sort((a: OrderChat, b: OrderChat) => {
            return new Date(a.chatTime).getTime() - new Date(b.chatTime).getTime();
        });
    }

    send() {
        if (this.messageSend) {
            this.chatDTO.orderId = this.orderDetailRO.orderData.orderId;
            this.chatDTO.userId = this.orderDetailRO.orderData.userId;
            this.chatDTO.content = this.messageSend;
            this.messageSend = '';
            const ordermessage = new OrderChat();
            ordermessage.content = this.chatDTO.content;
            ordermessage.chatTime = new Date();
            ordermessage.orderId = this.orderDetailRO.orderData.orderId;
            ordermessage.userId = this.orderDetailRO.orderData.userId;
            this.orderDetailService.postChat(this.chatDTO).subscribe(
                (res) => {
                    this.dataChat.push(ordermessage)
                }
            );
        }
    }

    paymentOrder() {
        const data = {
            orderIds : [this.orderId],
        };
        this.dialog.open(PaymentOrdersComponent, {
            data: data,
            panelClass: 'payment-order-dialog',
        }).afterClosed().subscribe((res) => {
            if (res) {
                location.reload();
            }
        });
    }
}
