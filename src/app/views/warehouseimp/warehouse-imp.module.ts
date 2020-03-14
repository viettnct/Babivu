import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddWarehouseImpComponent} from './add/add-warehouse-imp.component';
import { RouterModule } from '@angular/router';
import {WarehouseImpRoutes} from './warehouse-imp.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material';
import {WarehouseImpService} from '../../services/warehouse-imp.service';

@NgModule({
    declarations: [AddWarehouseImpComponent],
    imports: [
        RouterModule.forChild(WarehouseImpRoutes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        MatDialogModule,
    ],
    providers: [WarehouseImpService]
})
export class WarehouseImpModule {
}
