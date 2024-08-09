import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authRoutes } from './auth.routes';
import { AuthComponent } from './component/auth.component';
import { AuthService } from '../../services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../../interceptors/jwt.interceptor';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(authRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class AuthModule { }
