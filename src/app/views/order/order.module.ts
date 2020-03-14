import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderBuyComponent} from './order-buy/order-buy.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {OrderRoutes} from './order.routing';
import {OrderService} from '../../services/order.service';
import {MatCurrencyFormatModule} from 'mat-currency-format';

import {
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatChipsModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatGridListModule,
    MatFormFieldModule
} from '@angular/material';
import {OrderDetailService} from '../../services/order-detail.service';

@NgModule({
    declarations: [OrderBuyComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(OrderRoutes),
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatCardModule,
        MatChipsModule,
        MatGridListModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        MatListModule,
        MatCurrencyFormatModule,
    ],
    providers: [OrderService, OrderDetailService]
})
export class OrderModule {
}
