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
    // Si tienes una ruta protegida para dashboard:
    // { path: 'profile', component: ProfileComponent }
];
