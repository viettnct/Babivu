import { Routes } from '@angular/router';
import { Part1Component } from './part1/part1.component';
import { Part2Component } from './part2/part2.component';
import { Part3Component } from './part3/part3.component';
// import { OrdersComponent } from './orders/orders.component';
// import { OrderDetailComponent } from './order-detail/order-detail.component';

export const CartRoutes: Routes = [
  {
    path: 'pharse1',
    component: Part1Component
  }, {
    path: 'pharse2',
    component: Part2Component
  }, {
    path: 'pharse3',
    component: Part3Component
  }
];
