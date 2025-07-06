import type { Routes } from "@angular/router"
import { LoginComponent } from "./features/auth/login/login.component"
import { RegisterStep1Component } from "./features/auth/register-step1/register-step1.component"
import { RegisterStep2Component } from "./features/auth/register-step2/register-step2.component"
import { RegisterStep3Component } from "./features/auth/register-step3/register-step3.component"
import { MainComponent } from "./features/profile/main/main.component"
import { ChangePasswordComponent } from "./features/profile/change-password/change-password.component"
import { EditProfileComponent } from "./features/profile/edit-profile/edit-profile.component"
import { RecordListComponent } from "./features/record/record-list/record-list.component"
import { RecordDetailComponent } from "./features/record/record-detail/record-detail.component"
import { RecordConfirmationComponent } from "./features/record/record-confirmation/record-confirmation.component"
import { PaymentInfoComponent } from "./features/payment/payment-info/payment-info.component"
import { EditPaymentComponent } from "./features/payment/edit-payment/edit-payment.component"
import { RentComponent } from "./features/rent/rent-list/rent.component"
import { RentConfirmComponent } from "./features/rent/rent-confirm/rent-confirm.component"
import { RentFinalConfirmComponent } from "./features/rent/rent-final-confirm/rent-final-confirm.component"
import { RentCancelComponent } from "./features/rent/rent-cancel/rent-cancel.component"
import { ProviderProfileComponent } from "./features/provide/provider-profile/provider-profile.component"
import { ProvideComponent } from "./features/provide/provide-form-car/provide.component"
import { ProvideSuccessComponent } from "./features/provide/provide-success/provide-success.component"
import { ProvidePaymentComponent } from "./features/provide/provide-payment/provide-payment.component"
import { ProvideProfileEditComponent } from "./features/provide/provide-profile-edit/provide-profile-edit.component"
import { ProvidePaymentEditComponent } from "./features/provide/provide-payment-edit/provide-payment-edit.component"
import { YourCarsComponent } from "./features/yourcars/your-cars.component"
import { authGuard } from "./core/guards/auth.guard"
import { roleGuard } from "./core/guards/role.guard"

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register-step1", component: RegisterStep1Component },
    { path: "register-step2", component: RegisterStep2Component },
    { path: "register-step3", component: RegisterStep3Component },
    { path: "rent", component: RentComponent, canActivate: [authGuard] },
    { path: "rent/confirm/:id", component: RentConfirmComponent, canActivate: [authGuard] },
    { path: "rent/final-confirm/:id", component: RentFinalConfirmComponent, canActivate: [authGuard] },
    { path: "rent/cancel/:id", component: RentCancelComponent, canActivate: [authGuard] },
    { path: "profile", component: MainComponent, canActivate: [authGuard] },
    { path: "change-password", component: ChangePasswordComponent, canActivate: [authGuard] },
    { path: "edit-profile", component: EditProfileComponent, canActivate: [authGuard] },
    { path: "record", component: RecordListComponent, canActivate: [authGuard] },
    { path: "record/detail/:id", component: RecordDetailComponent, canActivate: [authGuard] },
    { path: "record/confirmation/:id", component: RecordConfirmationComponent, canActivate: [authGuard] },
    { path: "payment", component: PaymentInfoComponent, canActivate: [authGuard] },
    { path: "payment/edit", component: EditPaymentComponent, canActivate: [authGuard] },
    { path: "provider/profile", component: ProviderProfileComponent, canActivate: [authGuard, roleGuard(["provider"])] },
    { path: "provide", component: ProvideComponent, canActivate: [authGuard, roleGuard(["provider"])] },
    { path: "provide/success", component: ProvideSuccessComponent, canActivate: [authGuard, roleGuard(["provider"])] },
    { path: "provide/payment", component: ProvidePaymentComponent, canActivate: [authGuard, roleGuard(["provider"])] },
    {
        path: "provide/profile/edit",
        component: ProvideProfileEditComponent,
        canActivate: [authGuard, roleGuard(["provider"])],
    },
    {
        path: "provide/payment/edit",
        component: ProvidePaymentEditComponent,
        canActivate: [authGuard, roleGuard(["provider"])],
    },
    { path: "provide/your-cars", component: YourCarsComponent, canActivate: [authGuard, roleGuard(["provider"])] },
]
