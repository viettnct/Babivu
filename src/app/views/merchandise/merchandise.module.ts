import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddMerchandiseComponent} from './add/add-merchandise.component';
import {RouterModule} from '@angular/router';
import {MerchandiseRoutes} from './merchandise.routing';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MerchandiseServices} from '../../services/merchandise.services';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HistoryDialogComponent } from './add/history-dialog/history-dialog.component';
import { MatDialogModule } from '@angular/material';
import {WarehouseImpService} from '../../services/warehouse-imp.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(MerchandiseRoutes),
        NgxDatatableModule,
        MatDialogModule,
    ],
    declarations: [AddMerchandiseComponent, HistoryDialogComponent],
    providers: [MerchandiseServices],
    entryComponents: [HistoryDialogComponent]
})
export class MerchandiseModule {
}
