import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterStep1Component } from './features/auth/register-step1/register-step1.component';
import { RegisterStep2Component } from './features/auth/register-step2/register-step2.component';
import { RegisterStep3Component } from './features/auth/register-step3/register-step3.component';
import { MainComponent } from './features/profile/main/main.component';
import {ChangePasswordComponent} from "./features/profile/change-password/change-password.component";
import {EditProfileComponent} from './features/profile/edit-profile/edit-profile.component';
import { RecordListComponent } from './features/record/record-list/record-list.component';
import { RecordDetailComponent } from './features/record/record-detail/record-detail.component';
import { RecordConfirmationComponent } from './features/record/record-confirmation/record-confirmation.component';
import { PaymentInfoComponent } from './features/payment/payment-info/payment-info.component';
import { EditPaymentComponent } from './features/payment/edit-payment/edit-payment.component';
import {RentComponent} from "./features/rent/rent-list/rent.component";
import {RentConfirmComponent} from "./features/rent/rent-confirm/rent-confirm.component";
import {RentFinalConfirmComponent} from "./features/rent/rent-final-confirm/rent-final-confirm.component";
import {RentCancelComponent} from "./features/rent/rent-cancel/rent-cancel.component";
import {ProviderProfileComponent} from "./features/provide/provider-profile/provider-profile.component";
import {ProvideComponent} from "./features/provide/provide-form-car/provide.component";
import {ProvideSuccessComponent} from "./features/provide/provide-success/provide-success.component";
import {ProvidePaymentComponent} from "./features/provide/provide-payment/provide-payment.component";
import {ProvideProfileEditComponent} from "./features/provide/provide-profile-edit/provide-profile-edit.component";
import {ProvidePaymentEditComponent} from "./features/provide/provide-payment-edit/provide-payment-edit.component";
import {YourCarsComponent} from "./features/yourcars/your-cars.component";

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
    { path: 'record/detail/:id', component: RecordDetailComponent },
    { path: 'record/confirmation/:id', component: RecordConfirmationComponent},
    { path: 'payment', component: PaymentInfoComponent },
    { path: 'payment/edit', component: EditPaymentComponent },
    { path: 'rent', component: RentComponent },
    { path: 'rent/confirm/:id', component: RentConfirmComponent },
    { path: 'rent/final-confirm/:id', component: RentFinalConfirmComponent },
    { path: 'rent/cancel/:id', component: RentCancelComponent},
    { path: 'provider/profile', component: ProviderProfileComponent },
    { path : 'provide', component: ProvideComponent},
    { path : 'provide/success', component: ProvideSuccessComponent},
    { path : 'provide/payment', component: ProvidePaymentComponent},
    { path : 'provide/profile/edit', component: ProvideProfileEditComponent},
    { path : 'provide/payment/edit', component: ProvidePaymentEditComponent},
    { path : 'provide/your-cars', component: YourCarsComponent},
    // Si tienes una ruta protegida para dashboard:
    // { path: 'profile', component: ProfileComponent }
];
