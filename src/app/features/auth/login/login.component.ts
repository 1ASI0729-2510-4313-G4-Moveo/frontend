import { Component } from "@angular/core"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AuthService } from "../auth.service"

// Angular Material Imports
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCardModule } from "@angular/material/card"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup
  loginError = false
  selectedUserType: "user" | "provider" | null = null
  hidePassword = true
  isLoading = false

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })
  }

  selectUserType(type: "user" | "provider"): void {
    this.selectedUserType = type
    this.loginError = false
  }

  onSubmit(): void {
    if (this.loginForm.invalid || !this.selectedUserType) return

    this.isLoading = true
    this.loginError = false

    const { email, password } = this.loginForm.value

    this.authService.login().subscribe({
      next: (users) => {
        const user = users.find(
            (u: any) => u.email === email && u.password === password && u.type === this.selectedUserType,
        )

        if (user) {
          localStorage.setItem("userId", user.id)
          localStorage.setItem("userName", user.name)
          localStorage.setItem("email", user.email)
          localStorage.setItem("type", user.type)
          localStorage.setItem("phone", user.phone)

          // Redirect based on user type
          if (user.type === "provider") {
            this.router.navigate(["/provider/profile"])
          } else {
            this.router.navigate(["/rent"])
          }

          this.loginError = false
        } else {
          this.loginError = true
        }
        this.isLoading = false
      },
      error: () => {
        this.loginError = true
        this.isLoading = false
      },
    })
  }
}
