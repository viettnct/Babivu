import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockScreenComponent } from './lockscreen/lockscreen.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SessionRoutes } from './session.routing';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { HttpService } from 'app/services/common/http.service';
import { LoginService } from 'app/services/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule.forChild(SessionRoutes),
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCheckboxModule,
    HttpModule
  ],
  declarations: [ 
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    LockScreenComponent,
  ],
  providers: [
    HttpService,
    LoginService
  ],
})

export class SessionModule {}
