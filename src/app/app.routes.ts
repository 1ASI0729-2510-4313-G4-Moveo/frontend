import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterStep1Component } from './features/auth/register-step1/register-step1.component';
import { RegisterStep2Component } from './features/auth/register-step2/register-step2.component';
import { RegisterStep3Component } from './features/auth/register-step3/register-step3.component';
import { MainComponent } from './features/profile/main/main.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register-step1', component: RegisterStep1Component },
    { path: 'register-step2', component: RegisterStep2Component },
    { path: 'register-step3', component: RegisterStep3Component },
    { path: 'profile', component: MainComponent },
    // Si tienes una ruta protegida para dashboard:
    // { path: 'profile', component: ProfileComponent }
];
