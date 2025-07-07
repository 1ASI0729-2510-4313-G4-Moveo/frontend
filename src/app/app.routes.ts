import type { Routes } from "@angular/router"
import { authGuard } from "./core/guards/auth.guard"
import { roleGuard } from "./core/guards/role.guard"

export const routes: Routes = [
    // Public routes
    { path: "", redirectTo: "/login", pathMatch: "full" },
    {
        path: "login",
        loadComponent: () => import("./features/auth/login/login.component").then((m) => m.LoginComponent),
    },
    {
        path: "register-step1",
        loadComponent: () =>
            import("./features/auth/register-step1/register-step1.component").then((m) => m.RegisterStep1Component),
    },
    {
        path: "register-step2",
        loadComponent: () =>
            import("./features/auth/register-step2/register-step2.component").then((m) => m.RegisterStep2Component),
    },
    {
        path: "register-step3",
        loadComponent: () =>
            import("./features/auth/register-step3/register-step3.component").then((m) => m.RegisterStep3Component),
    },

    // Protected routes for regular users
    {
        path: "rent",
        loadComponent: () => import("./features/rent/rent-list/rent.component").then((m) => m.RentComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "rent/confirm/:id",
        loadComponent: () =>
            import("./features/rent/rent-confirm/rent-confirm.component").then((m) => m.RentConfirmComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "rent/payment/:id",
        loadComponent: () =>
            import("./features/rent/rent-payment/rent-payment.component").then((m) => m.RentPaymentComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "rent/final-confirm/:id",
        loadComponent: () =>
            import("./features/rent/rent-final-confirm/rent-final-confirm.component").then(
                (m) => m.RentFinalConfirmComponent,
            ),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "rent/cancel/:id",
        loadComponent: () => import("./features/rent/rent-cancel/rent-cancel.component").then((m) => m.RentCancelComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "record",
        loadComponent: () =>
            import("./features/record/record-list/record-list.component").then((m) => m.RecordListComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "record/detail/:id",
        loadComponent: () =>
            import("./features/record/record-detail/record-detail.component").then((m) => m.RecordDetailComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "record/confirmation/:id",
        loadComponent: () =>
            import("./features/record/record-confirmation/record-confirmation.component").then(
                (m) => m.RecordConfirmationComponent,
            ),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "payment",
        loadComponent: () =>
            import("./features/payment/payment-info/payment-info.component").then((m) => m.PaymentInfoComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "payment/edit",
        loadComponent: () =>
            import("./features/payment/edit-payment/edit-payment.component").then((m) => m.EditPaymentComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "profile",
        loadComponent: () => import("./features/profile/main/main.component").then((m) => m.MainComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "edit-profile",
        loadComponent: () =>
            import("./features/profile/edit-profile/edit-profile.component").then((m) => m.EditProfileComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },
    {
        path: "change-password",
        loadComponent: () =>
            import("./features/profile/change-password/change-password.component").then((m) => m.ChangePasswordComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "user" },
    },

    // Protected routes for providers
    {
        path: "provide",
        loadComponent: () =>
            import("./features/provide/provide-form-car/provide.component").then((m) => m.ProvideComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "provider" },
    },
    {
        path: "provide/success",
        loadComponent: () =>
            import("./features/provide/provide-success/provide-success.component").then((m) => m.ProvideSuccessComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "provider" },
    },
    {
        path: "provider/dashboard",
        loadComponent: () =>
            import("./features/provide/provider-dashboard/provider-dashboard.component").then(
                (m) => m.ProviderDashboardComponent,
            ),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "provider" },
    },
    {
        path: "provider/profile",
        loadComponent: () =>
            import("./features/provide/provider-profile/provider-profile.component").then((m) => m.ProviderProfileComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "provider" },
    },
    {
        path: "provide/profile/edit",
        loadComponent: () =>
            import("./features/provide/provide-profile-edit/provide-profile-edit.component").then(
                (m) => m.ProvideProfileEditComponent,
            ),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "provider" },
    },
    {
        path: "provide/payment",
        loadComponent: () =>
            import("./features/provide/provide-payment/provide-payment.component").then((m) => m.ProvidePaymentComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "provider" },
    },
    {
        path: "provide/payment/edit",
        loadComponent: () =>
            import("./features/provide/provide-payment-edit/provide-payment-edit.component").then(
                (m) => m.ProvidePaymentEditComponent,
            ),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "provider" },
    },
    {
        path: "your-cars",
        loadComponent: () => import("./features/yourcars/your-cars.component").then((m) => m.YourCarsComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "provider" },
    },
    {
        path: "your-cars/details/:id",
        loadComponent: () =>
            import("./features/yourcars/car-details/car-details.component").then((m) => m.CarDetailsComponent),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: "provider" },
    },

    // Shared routes (both user and provider can access)
    {
        path: "payment-providers",
        loadComponent: () =>
            import("./project/pages/payment-providers/payment-providers.component").then((m) => m.PaymentProvidersComponent),
        canActivate: [authGuard],
    },

    // Fallback route
    {
        path: "**",
        loadComponent: () =>
            import("./public/pages/page-not-found/page-not-found.component").then((m) => m.PageNotFoundComponent),
    },
]
