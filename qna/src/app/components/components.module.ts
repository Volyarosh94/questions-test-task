import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services';


@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [],
  exports: [
    HeaderComponent
  ],
})
export class ComponentsModule { }
