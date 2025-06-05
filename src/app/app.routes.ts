import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterStep1Component } from './auth/register-step1/register-step1.component';
import { RegisterStep2Component } from './auth/register-step2/register-step2.component';
import { RegisterStep3Component } from './auth/register-step3/register-step3.component';
import { MainComponent } from './profile/main/main.component';
import {ChangePasswordComponent} from "./profile/change-password/change-password.component";
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';
import { RecordListComponent } from './record/record-list/record-list.component';
import { RecordDetailComponent } from './record/record-detail/record-detail.component';
import { RecordConfirmationComponent } from './record/record-confirmation/record-confirmation.component';
import { PaymentInfoComponent } from './payment/payment-info/payment-info.component';
import { EditPaymentComponent } from './payment/edit-payment/edit-payment.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register-step1', component: RegisterStep1Component },
    { path: 'register-step2', component: RegisterStep2Component },
    { path: 'register-step3', component: RegisterStep3Component },
    { path: 'profile', component: MainComponent },
    { path: 'change-password', component: ChangePasswordComponent},
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'record', component: RecordListComponent },
    { path: 'record/detail', component: RecordDetailComponent },
    { path: 'record/confirmation', component: RecordConfirmationComponent},
    { path: 'payment', component: PaymentInfoComponent },
    { path: 'payment/edit', component: EditPaymentComponent },
    // Si tienes una ruta protegida para dashboard:
    // { path: 'profile', component: ProfileComponent }
];
