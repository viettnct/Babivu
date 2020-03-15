import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestComponent} from './request/request.component';
import {RouterModule} from '@angular/router';
import {DeliveryRoutes} from './delivery.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
    declarations: [RequestComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(DeliveryRoutes),
        FormsModule,
        NgxDatatableModule,
        ReactiveFormsModule,
    ]
})
export class DeliveryModule {
}
