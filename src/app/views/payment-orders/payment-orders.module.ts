import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentOrdersComponent} from './payment-orders.component';
import {MatDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderService} from '../../services/order.service';

@NgModule({
    declarations: [PaymentOrdersComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [OrderService],
})
export class PaymentOrdersModule {
}
