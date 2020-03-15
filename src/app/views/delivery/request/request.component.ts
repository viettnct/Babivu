import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Merchandise} from '../../../model/merchandise.model';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import {Page} from '../../../model/page.model';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
    messages: any[];
    delivery: any = [];
    merchandiseList: Merchandise[] = [];
    tableMessage = {
        emptyMessage: 'Không có dữ liệu'
    };
    columnMode = ColumnMode;
    selectionType = SelectionType;
    selected: Merchandise[];
    page = new Page();
    merchandiseCode: string;
    shelfPosition;
    shelfPositionList: any[];
    shippingMethod: any[];
    receiverProvinceList: any[];
    receiverDistrictList: any[];
    constructor() {
    }

    ngOnInit() {
        // Prepare data
        const data = new Merchandise();
        data.merchandiseCode = 'ASD123';
        data.netWeight = 12;
        data.width = 34;
        data.height = 12;
        data.length = 50;
        data.shelfPosition = 'ASDASK-05-12313';
        data.chargedWeight = 123;
        this.merchandiseList.push(data);
        this.merchandiseList.push(data);
        this.merchandiseList.push(data);
    }

    saveDelivery(deliveryForm: NgForm) {
        console.log(deliveryForm)
    }

    onSelect(selected: any) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }
}
