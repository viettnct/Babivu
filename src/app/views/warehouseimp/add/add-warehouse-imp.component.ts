import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import {WarehouseImp} from '../../../model/warehouse-imp.model';
import {WarehouseImpDetail} from '../../../model/warehouse-imp-detail.model';
import {WarehouseImpService} from '../../../services/warehouse-imp.service';
import {Warehouse} from '../../../model/warehouse.model';
import {ImpExpStatus} from '../../../model/imp-exp-status.model';
import {Storekeeper} from '../../../model/storekeeper.model';
import {ActivatedRoute} from '@angular/router';
import {ClientProfile} from '../../../model/client-profile.model';

@Component({
    selector: 'app-add-warehouse-imp',
    templateUrl: './add-warehouse-imp.component.html',
    styleUrls: ['./add-warehouse-imp.component.scss']
})
export class AddWarehouseImpComponent implements OnInit {
    // Const
    // TODO: paging
    page = 1;
    perPage = 5;
    defaultWarehouseStatus = '1';
    defaultStoreKeeper = 1;
    defaultImportWarehouse = 2;
    defaultImpDate = new Date().toISOString().substr(0, 10);
    userId;
    // TODO: need to handler get weightConversionRatio
    weightConversionRatio = 5;

    // Something
    messages = [];
    isEditWarehouseImpDetails = false;
    warehouseExpCode: string;
    isLoadByImpId = false;
    account: ClientProfile;

    // Data
    warehouseImp: WarehouseImp = new WarehouseImp();
    warehouseImpDetail: WarehouseImpDetail = new WarehouseImpDetail();
    warehouseImpDetailList: WarehouseImpDetail[] = [];
    warehouseImpStatusList: ImpExpStatus[] = [];
    warehouseList: Warehouse[];
    storekeeperList: Storekeeper[] = [];

    // Ngx Datatable
    tableMessage = {
        emptyMessage: 'Không có dữ liệu'
    };
    columnMode = ColumnMode;
    selectionType = SelectionType;
    selected: WarehouseImpDetail[] = [];

    constructor(
        private warehouseImpService: WarehouseImpService,
        private changeDetectorRef: ChangeDetectorRef,
        private activeRoute: ActivatedRoute,
    ) {
    }

    async ngOnInit() {
        this.account = JSON.parse(localStorage.getItem('userData'));
        this.userId = this.account.userId;
        await this.activeRoute.queryParams.subscribe(async (params) => {
            if (params.warehouseImpId) {
                await this.loadWarehouseById(params.warehouseImpId);
            }
        });
        await this.loadWareHouseStatus();
        await this.loadWareHouseList();
        this.warehouseImp.impDate = this.defaultImpDate;
    }

    saveWarehouseImp(form) {
        if (form.valid) {
            this.warehouseImp.lsDetail = this.warehouseImpDetailList;
            this.warehouseImp.createdUserId = this.warehouseImp.changeUserId = this.userId;
            this.warehouseImpService.saveWarehouseImp(this.warehouseImp).toPromise()
                .then((res) => {
                    if (res.result.success) {
                        this.showMessage('alert-success', 'Bạn đã lưu thành công phiếu nhập hàng');
                    } else {
                        this.showMessage('alert-danger', res.result.message);
                    }
                })
                .catch(() => {
                    this.showMessage('alert-danger', 'Lưu kiện hàng không thành công');
                })
        }
    }

    /**
     * Save warehouse import info
     * @param form
     */
    saveWarehouseImpDetail(form) {
        if (this.isEditWarehouseImpDetails) {
            // Because warehouse import detail data is pass by reference to form data, just refresh list with this way
            this.warehouseImpDetailList = [...this.warehouseImpDetailList];
        } else {
            // Push new warehouse import detail data to list and refresh list
            this.warehouseImpDetailList = [...this.warehouseImpDetailList, this.warehouseImpDetail];
        }
        // Because warehouse import detail data is pass by reference to form data, need to init new warehouse import detail and reset form
        this.warehouseImpDetail = new WarehouseImpDetail();
        form.resetForm();
        this.isEditWarehouseImpDetails = false;
        this.selected = [];
    }

    /**
     * Complete warehouse import
     * @param form
     */
    completeWarehouseImp(form) {
        if (form.valid) {
            this.warehouseImp.lsDetail = this.warehouseImpDetailList;
            this.warehouseImp.changeUserId = this.userId;
            this.warehouseImpService.completeWarehouseImp(this.warehouseImp).toPromise()
                .then((res) => {
                    if (res.result.success) {
                        this.showMessage(
                            'alert-success',
                            'Bạn đã hoàn tất thành công phiếu nhập hàng'
                        );
                        const oldData = this.warehouseImp;
                        form.resetForm();
                        this.changeDetectorRef.detectChanges();
                        this.warehouseImp.impDate = new Date().toISOString().substr(0, 10);
                        this.warehouseImp.warehouseId = oldData.warehouseId;
                        this.warehouseImp.storekeeperId = oldData.storekeeperId;
                        this.warehouseImp.status = oldData.status;
                        this.isLoadByImpId = false;
                    } else {
                        this.showMessage('alert-danger', res.result.message);
                    }
                })
                .catch(() => {
                    this.showMessage('alert-danger', 'Hoàn tất kiện hàng không thành công');
                })
        }
    }

    /**
     * Edit warehouse import details
     */
    edit() {
        if (this.selected.length > 0) {
            this.warehouseImpDetail = this.selected[this.selected.length - 1];
            this.isEditWarehouseImpDetails = true;
        }
    }

    /**
     * Delete warehouse import details
     */
    delete() {
        if (this.selected.length > 0) {
            if (confirm('Bạn có chắc chắn muốn xóa?')) {
                let deleteApiIds = this.selected.filter(item => item.merchandiseId)
                    .map(itm => itm.merchandiseId);
                deleteApiIds = deleteApiIds.filter((v, i) => deleteApiIds.indexOf(v) === i);
                this.warehouseImpService.deleteMerchandise(deleteApiIds).toPromise()
                    .then((res) => {
                        if (res.result.success) {
                            this.showMessage('alert-success', 'Bạn đã xóa thành công kiện hàng');
                            const filtered = this.warehouseImpDetailList.filter(element => !this.selected.includes(element));
                            this.warehouseImpDetailList = [...filtered];
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
     * On select warehouse import details
     * @param selected
     */
    onSelect({selected}) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    /**
     * Load warehouse status
     */
    loadWareHouseStatus() {
        this.warehouseImpService.getImpExpStatus().toPromise()
            .then((res) => {
                if (res.result.success) {
                    this.warehouseImpStatusList = res.result.data;
                    if (!this.warehouseImp.status) {
                        this.warehouseImp.status = this.defaultWarehouseStatus;
                    }
                } else {
                    this.warehouseImpStatusList = [];
                }
            })
            .catch(() => {
                this.warehouseImpStatusList = [];
            });
    }

    /**
     * Load warehouse list
     */
    loadWareHouseList() {
        this.warehouseImpService.getAllWarehouse().toPromise()
            .then((res) => {
                if (res.result.success) {
                    this.warehouseList = res.result.data;
                    if (!this.warehouseImp.warehouseId) {
                        this.warehouseImp.warehouseId = this.defaultImportWarehouse;
                    }
                    this.loadListStorekeeperInWarehouse(this.warehouseImp.warehouseId);
                } else {
                    this.warehouseList = [];
                }
            })
            .catch(() => {
                this.warehouseList = [];
            });
    }

    /**
     * Load storekeeper list by warehouse import id
     */
    loadListStorekeeperInWarehouse(value) {
        this.warehouseImpService.getListStorekeeperInWarehouse(value).toPromise()
            .then((res) => {
                if (res.result.success) {
                    this.storekeeperList = res.result.data;
                    if (!this.warehouseImp.storekeeperId) {
                        this.warehouseImp.storekeeperId = this.defaultStoreKeeper;
                    }
                    const storekeeper = this.storekeeperList.find(item => item.userId === this.warehouseImp.storekeeperId);
                    if (!storekeeper) {
                        this.warehouseImp.storekeeperId = this.storekeeperList[0].userId;
                    }
                } else {
                    this.storekeeperList = [];
                }
            }).catch(() => {
            this.storekeeperList = [];
        });
    }

    /**
     * Load warehouse import by export code
     * @param expCode
     */
    async loadWarehouseImpByExpCode(expCode) {
        this.warehouseImpService.getWarehouseExpByCode(expCode).toPromise()
            .then((res) => {
                if (res.result.success) {
                    this.warehouseImp.warehouseExpId = res.result.data.warehouseExpId;
                    this.warehouseImp.expWarehouseId = res.result.data.expWarehouseId;
                    const warehouseImpDetail = new WarehouseImpDetail();
                    const warehouseImpDetailList = [];
                    for (const item of res.result.data.lsDetail) {
                        warehouseImpDetail.merchandiseId = item.merchandiseWarehouseId;
                        warehouseImpDetail.merchandiseCode = item.merchandiseCode;
                        warehouseImpDetail.netWeight = item.netWeight;
                        warehouseImpDetail.chargedWeight = item.chargedWeight;
                        warehouseImpDetail.paymentWeight = item.paymentWeight;
                        warehouseImpDetail.length = item.length;
                        warehouseImpDetail.width = item.width;
                        warehouseImpDetail.height = item.height;
                        warehouseImpDetail.shelfPosition = this.warehouseImpDetail.shelfPosition;
                        warehouseImpDetailList.push(warehouseImpDetail);
                    }
                    this.warehouseImpDetailList = [...warehouseImpDetailList];
                } else {
                    this.warehouseImpDetailList = [];
                    this.warehouseImp = new WarehouseImp();
                }
            }).catch(() => {
            this.warehouseImp = new WarehouseImp();
            this.warehouseImpDetailList = [];
        });
    }

    /**
     * load warehouse import info by warehouse import id
     * @param warehouseImpId
     */
    async loadWarehouseById(warehouseImpId) {
        this.warehouseImpService.getWarehouseImpViewById(warehouseImpId).toPromise()
            .then((res) => {
                if (res.result.success) {
                    this.warehouseImp = res.result.data;
                    this.warehouseImp.impDate = this.warehouseImp.impDate ?
                        new Date(this.warehouseImp.impDate).toISOString().substr(0, 10) :
                        new Date().toISOString().substr(0, 10);
                    this.warehouseImpDetailList = this.warehouseImp.lsDetail;
                    this.isLoadByImpId = true;
                } else {
                    this.warehouseImp = new WarehouseImp();
                    this.warehouseImpDetailList = [];
                }
            }).catch(() => {
            this.warehouseImp = new WarehouseImp();
            this.warehouseImpDetailList = [];
        });
    }

    nextFocus(event) {
        event.preventDefault();
        const inputs =
            Array.prototype.slice.call(document.querySelectorAll('input[tabindex]'));
        const index =
            (inputs.indexOf(document.activeElement) + 1) % inputs.length;
        const input = inputs[index];
        input.focus();
        input.select();
    }

    /**
     * Show message
     * @param messageClass = bootstrap alert class
     * @param detail
     */
    showMessage(messageClass: string, detail: string): void {
        // this.messages = [];
        this.messages.push({messageClass: messageClass, detail});
        setTimeout(() => {
            this.messages = [];
        }, 3000);
    }

    /**
     * Calculate weightConversionRatio
     */
    calWeightConversionRatio() {
        if (this.warehouseImpDetail.length && this.warehouseImpDetail.width && this.warehouseImpDetail.height) {
            this.warehouseImpDetail.chargedWeight =
                (this.warehouseImpDetail.length * this.warehouseImpDetail.width * this.warehouseImpDetail.height)
                / this.weightConversionRatio;
        } else {
            this.warehouseImpDetail.chargedWeight = 0;
        }
    }
}
