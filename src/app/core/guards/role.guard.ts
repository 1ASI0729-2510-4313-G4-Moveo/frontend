import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../../features/auth/auth.service"

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
    return (route, state) => {
        const authService = inject(AuthService)
        const router = inject(Router)

        const userRole = authService.getUserRole()

        if (userRole && allowedRoles.includes(userRole)) {
            return true
        }

        router.navigate(["/rent"])
        return false
    }
}
