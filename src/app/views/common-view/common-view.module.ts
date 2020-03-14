import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonViewComponent } from './common-view.component';
import { CommonViewRoutes } from './common-view.routing';
import { MatIconModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { LstClientService } from 'app/services/lstClient.service';
import { HttpModule } from '@angular/http';
import { HttpService } from 'app/services/common/http.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CommonViewRoutes),
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [
    LstClientService,
    HttpService
  ],
  declarations: [ CommonViewComponent ]
})

export class CommonViewModule {}
