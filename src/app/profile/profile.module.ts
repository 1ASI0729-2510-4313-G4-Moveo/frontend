import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HeaderBarComponent } from '../public/components/header-bar/header-bar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChangePasswordComponent,
    HeaderBarComponent
  ]
})
export class ProfileModule { }
