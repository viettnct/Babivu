import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
    path: '',
    redirectTo: 'admin-tool',
    pathMatch: 'full',
}, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
            path: 'admin-tool',
            loadChildren: './views/admin-manager/admin-manager.module#AdminManagerModule'
        },
        {
            path: 'wallet-manager',
            loadChildren: './views/wallet-manager/apps.module#AppsModule'
        },
        {
            path: 'wallet-lstopup',
            loadChildren: './views/wallet-lstopup/forms.module#FormModule'
        },
        {
            path: 'ship-manager',
            loadChildren: './views/ship-manager/ship-manager.module#ShipManagerModule'
        }
        , {
            path: 'tables',
            loadChildren: './views/support/tables.module#TablesModule'
        }, {
            path: 'space',
            loadChildren: './views/space/chartlib.module#ChartlibModule'
        }, {
            path: 'cards',
            loadChildren: './views/cards/cards.module#CardsDemoModule'
        }, {
            path: 'pages',
            loadChildren: './views/custom-pages/pages.module#PagesDemoModule'
        }, {
            path: 'user-pages',
            loadChildren: './views/user-pages/users.module#UsersModule'
        }, {
            path: 'ecommerce',
            loadChildren: './views/ecommerce/ecommerce.module#EcommerceDemoModule'
        }, {
            path: 'cart',
            loadChildren: './views/cart/cart.module#CartModule'
        },
        {
            path: 'merchandise',
            loadChildren: './views/merchandise/merchandise.module#MerchandiseModule'
        },
        {
            path: 'warehouseimp',
            loadChildren: './views/warehouseimp/warehouse-imp.module#WarehouseImpModule'
        },
        {
            path: 'order',
            loadChildren: './views/order/order.module#OrderModule'
        },
        {
            path: 'delivery',
            loadChildren: './views/delivery/delivery.module#DeliveryModule'
        },
    ]
}, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
        path: 'authentication',
        loadChildren: './views/session/session.module#SessionModule'
    }]
}, {
    path: '**',
    redirectTo: 'session/404'
}];
