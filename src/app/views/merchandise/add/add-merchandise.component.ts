import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Merchandise} from '../../../model/merchandise.model';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import {OrderStatus} from '../../../model/order-status.model';
import {MerchandiseServices} from '../../../services/merchandise.services';
import {NgForm} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {HistoryDialogComponent} from './history-dialog/history-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {ClientProfile} from '../../../model/client-profile.model';
import {WarehouseImpService} from '../../../services/warehouse-imp.service';
import {Page} from '../../../model/page.model';

@Component({
    selector: 'app-add',
    templateUrl: './add-merchandise.component.html',
    styleUrls: ['./add-merchandise.component.scss']
})
export class AddMerchandiseComponent implements OnInit {
    merchandisesList: Merchandise[];
    selected: Merchandise[];
    merchandises = new Merchandise();
    orderStatus: OrderStatus[];
    tableMessage = {
        emptyMessage: 'Không có dữ liệu'
    };
    columnMode = ColumnMode;
    selectionType = SelectionType;
    messages = [];
    page = new Page();
    // TODO: need to handler get weightConversionRatio
    weightConversionRatio = 5;
    defaultStatusId = '6';
    account: ClientProfile;

    constructor(
        private merchandiseServices: MerchandiseServices,
        public dialog: MatDialog,
        private activeRoute: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
        this.merchandisesList = [];
        this.selected = [];
        this.orderStatus = [];
        // TODO: Currently, client side paging
        this.page.pageNumber = 0;
        this.page.size = 999;
    }

    async ngOnInit() {
        this.account = JSON.parse(localStorage.getItem('userData'));
        this.merchandises.createdUserId = this.account.userId;
        await this.activeRoute.queryParams.subscribe(params => {
            if (params.ordercode) {
                this.merchandises.orderCode = params.ordercode;
                this.loadMerchandiseList(this.merchandises.orderCode, this.page.size, this.page.pageNumber + 1);
            }
        });
        this.loadMerchandiseStatus();
    }

    /**
     * On select merchandise
     * @param selected
     */
    onSelect({selected}) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    /**
     * On edit merchandise
     */
    edit() {
        if (this.selected.length > 0) {
            const orderCode = this.merchandises.orderCode;
            this.merchandises = this.selected[this.selected.length - 1];
            this.merchandises.orderCode = orderCode;
        }
    }

    /**
     * On delete merchandise
     */
    delete() {
        // TODO: waiting for api
        if (this.selected.length > 0) {
            if (confirm('Bạn có chắc chắn muốn xóa?')) {
                let deleteApiIds = this.selected.filter(item => item.merchandiseId)
                    .map(itm => itm.merchandiseId);
                deleteApiIds = deleteApiIds.filter((v, i) => deleteApiIds.indexOf(v) === i);
                this.merchandiseServices.deleteMerchandise(deleteApiIds).toPromise()
                    .then((res) => {
                        if (res.result.success) {
                            this.showMessage('alert-success', 'Bạn đã xóa thành công kiện hàng');
                            const filtered = this.merchandisesList.filter(element => !this.selected.includes(element));
                            this.merchandisesList = [...filtered];
                        } else {
                            this.showMessage('alert-danger', 'Xóa kiện hàng không thành công');
                        }
                    }).catch(() => {
                    this.showMessage('alert-danger', 'Xóa kiện hàng không thành công');
                });
            }
        }
    }

    /**
     * On view history merchandise
     */
    viewHistory() {
        if (this.selected.length > 0) {
            this.dialog.open(HistoryDialogComponent, {
                data: this.selected[this.selected.length - 1],
                width: '90%',
                height: 'auto'
            })
        }
    }

    /**
     * On add merchandise form submit
     * @param merchandiseForm
     */
    saveMerchandise(merchandiseForm: NgForm) {
        if (merchandiseForm.valid) {
            this.merchandiseServices.saveMerchandise(this.merchandises).toPromise()
                .then((res) => {
                    if (res.result.success) {
                        this.loadMerchandiseList(this.merchandises.orderCode, this.page.size, this.page.pageNumber + 1);
                        this.showMessage('alert-success', 'Bạn đã lưu thành công kiện hàng' + this.merchandises.merchandiseCode);
                        const orderCode = this.merchandises.orderCode;
                        this.merchandises = new Merchandise();
                        merchandiseForm.resetForm();
                        this.changeDetectorRef.detectChanges();
                        this.merchandises.orderCode = orderCode;
                    } else {
                        this.showMessage('alert-danger', res.result.message);
                    }

                })
                .catch(() => {
                    this.showMessage('alert-danger', 'Lưu kiện hàng ' + this.merchandises.merchandiseCode + ' thất bại');
                });
        }
    }

    /**
     * Load merchandise list by order id
     * @param orderCode
     * @param perPage
     * @param page
     */
    loadMerchandiseList(orderCode: string, perPage, page) {
        this.merchandiseServices.getMerchandiseViewModel(orderCode, perPage, page).toPromise()
            .then((res) => {
                this.merchandisesList = res.result.data;
            })
            .catch(() => {
                this.merchandisesList = [];
            });
    }

    /**
     * Load merchandise status
     */
    loadMerchandiseStatus() {
        this.merchandiseServices.getStatus().toPromise()
            .then((res) => {
                this.orderStatus = res.result.data;
                this.merchandises.status = this.defaultStatusId;
            })
            .catch(() => {
                this.orderStatus = []
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

    /**
     * Calculate weightConversionRatio
     */
    calWeightConversionRatio() {
        if (this.merchandises.length && this.merchandises.width && this.merchandises.height) {
            this.merchandises.chargedWeight =
                (this.merchandises.length * this.merchandises.width * this.merchandises.height) / this.weightConversionRatio;
        } else {
            this.merchandises.chargedWeight = 0;
        }
    }

    /**
     * Complete Merchandise
     */
    completeMerchandise() {
        this.merchandiseServices.completeMerchandise(this.merchandises.orderCode).toPromise()
            .then((res) => {
                if (res.result.success) {
                    this.showMessage('alert-success', 'Hoàn tất đơn hàng ' + this.merchandises.orderCode + ' thành công');
                } else {
                    this.showMessage('alert-danger', res.result.message);
                }
            }).catch(() => {
            this.showMessage('alert-danger', 'Hoàn tất đơn hàng ' + this.merchandises.orderCode + ' thất bại');
        })
    }
}
