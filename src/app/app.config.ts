import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core"
import { provideRouter } from "@angular/router"
import { routes } from "./app.routes"
import { provideHttpClient, withInterceptors } from "@angular/common/http"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatDialogModule } from "@angular/material/dialog"
import { authInterceptor } from "./core/interceptors/auth.interceptor"
import { errorInterceptor } from "./core/interceptors/error.interceptor"

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom(MatSnackBarModule, MatDialogModule),
  ],
}
