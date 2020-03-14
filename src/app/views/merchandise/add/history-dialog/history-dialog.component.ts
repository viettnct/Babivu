import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MerchandiseHistory} from '../../../../model/merchandise-history.model';
import {Merchandise} from '../../../../model/merchandise.model';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import {MerchandiseServices} from '../../../../services/merchandise.services';
import {Page} from '../../../../model/page.model';

@Component({
    selector: 'app-history-dialog',
    templateUrl: './history-dialog.component.html',
    styleUrls: ['./history-dialog.component.scss']
})
export class HistoryDialogComponent implements OnInit {
    merchandiseHistory = [new MerchandiseHistory()];
    merchandise: Merchandise;
    tableMessage = {
        emptyMessage: 'Không có dữ liệu'
    };
    page = new Page();
    columnMode = ColumnMode;
    selectionType = SelectionType;
    constructor(
        @Inject(MAT_DIALOG_DATA) private dialogData: any,
        private dialogRef: MatDialogRef<HistoryDialogComponent>,
        private merchandiseService: MerchandiseServices,
    ) {
        // TODO: Currently, client side paging
        this.page.pageNumber = 0;
        this.page.size = 999;
        this.merchandiseHistory = [];
    }

    ngOnInit() {
        if (this.dialogData) {
            this.merchandise = this.dialogData;
            this.loadMerchandiseHistory()
        } else {
            this.dialogRef.close();
        }
    }

    loadMerchandiseHistory() {
        this.merchandiseService.getMerchandiseHistory(
            this.merchandise.merchandiseId,
            this.page.size,
            this.page.pageNumber + 1
        ).toPromise()
            .then((res) => {
                this.merchandiseHistory = res.result.data;
            }).catch((err) => {
                this.merchandiseHistory = [];
        })
    }


    /**
     * TODO: Currently, client side paging
     * Populate the table with new data based on the page number
     * @param pageInfo The page to select
     */
    setPage(pageInfo) {
        this.page.pageNumber = pageInfo.offset;
        this.loadMerchandiseHistory();
    }
}
