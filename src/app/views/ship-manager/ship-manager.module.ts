import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatGridListModule,
  MatExpansionModule,
  MatChipsModule,
  MatCardModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatToolbarModule,
  MatDialogModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShipManagerRoutes } from './ship-manager.routing';
import { OrdersComponent } from './orders/orders.component';
import { ShipManagerService } from 'app/services/ship-manager.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailService } from 'app/services/order-detail.service';
import {PaymentOrdersModule} from '../payment-orders/payment-orders.module';
import {PaymentOrdersComponent} from '../payment-orders/payment-orders.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ShipManagerRoutes),
    FormsModule,
    ReactiveFormsModule,
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
    MatDialogModule,
      PaymentOrdersModule
   ],
  declarations: [
    OrdersComponent,
    OrderDetailComponent,
  ],
  providers: [
    ShipManagerService,
    OrderDetailService,
  ],
    entryComponents: [PaymentOrdersComponent]
})

export class ShipManagerModule {}
