import { Component } from "@angular/core"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AuthService } from "../auth.service"

// Angular Material Imports
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCardModule } from "@angular/material/card"
import { MatMenuModule } from "@angular/material/menu"
import { MatSnackBar } from "@angular/material/snack-bar"
import { MatDialog } from "@angular/material/dialog"

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
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup
  loginError = false
  hidePassword = true
  isLoading = false

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private snackBar: MatSnackBar,
      private dialog: MatDialog,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      userType: ["", Validators.required],
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return

    this.isLoading = true
    this.loginError = false

    const { email, password, userType } = this.loginForm.value

    this.authService.loginUser(email, password, userType).subscribe({
      next: (user) => {
        this.snackBar.open(`Welcome back, ${user.name}!`, "Close", {
          duration: 3000,
          panelClass: ["success-snackbar"],
        })

        // Redirect based on user type
        if (user.type === "provider") {
          this.router.navigate(["/provider/profile"])
        } else {
          this.router.navigate(["/rent"])
        }

        this.isLoading = false
      },
      error: (error) => {
        this.loginError = true
        this.snackBar.open(error.message || "Login failed", "Close", {
          duration: 5000,
          panelClass: ["error-snackbar"],
        })
        this.isLoading = false
      },
    })
  }

  showAbout(): void {
    this.snackBar.open("Moveo - Your trusted car rental platform", "Close", {
      duration: 3000,
      panelClass: ["info-snackbar"],
    })
  }

  showHelp(): void {
    this.snackBar.open("Contact us at support@moveo.com for help", "Close", {
      duration: 3000,
      panelClass: ["info-snackbar"],
    })
  }
}
