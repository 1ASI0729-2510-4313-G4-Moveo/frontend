import { Component } from "@angular/core"
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidationErrors,
} from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AuthService } from "../auth.service"
import { MatSnackBar } from "@angular/material/snack-bar"

// Angular Material Imports
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

@Component({
  selector: "app-register-step2",
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
  ],
  templateUrl: "./register-step2.component.html",
  styleUrls: ["./register-step2.component.css"],
})
export class RegisterStep2Component {
  registerForm: FormGroup
  selectedFile: File | null = null
  isLoading = false
  hidePassword = true
  hideRepeatPassword = true

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private snackBar: MatSnackBar,
  ) {
    this.registerForm = this.fb.group(
        {
          fullName: ["", [Validators.required, Validators.minLength(2)]],
          phone: ["", [Validators.required, Validators.pattern(/^\+?[0-9]{9,15}$/)]],
          email: ["", [Validators.required, Validators.email]],
          password: ["", [Validators.required, Validators.minLength(6)]],
          repeatPassword: ["", Validators.required],
        },
        { validators: this.passwordMatchValidator },
    )
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get("password")?.value
    const repeatPassword = form.get("repeatPassword")?.value
    return password === repeatPassword ? null : { mismatch: true }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return

    this.isLoading = true

    const { fullName, phone, email, password } = this.registerForm.value

    // First check if email already exists
    this.authService.checkEmailExists(email).subscribe({
      next: (exists) => {
        if (exists) {
          this.snackBar.open("Email already exists. Please use a different email.", "Close", {
            duration: 5000,
            panelClass: ["error-snackbar"],
          })
          this.isLoading = false
          return
        }

        // Proceed with registration
        const newUser = {
          name: fullName,
          phone,
          email,
          password,
          type: "user" as const,
        }

        this.authService.register(newUser).subscribe({
          next: (user) => {
            this.snackBar.open("Registration successful! Welcome to Moveo!", "Close", {
              duration: 3000,
              panelClass: ["success-snackbar"],
            })
            this.router.navigate(["/rent"])
            this.isLoading = false
          },
          error: (error) => {
            this.snackBar.open(error.message || "Registration failed. Please try again.", "Close", {
              duration: 5000,
              panelClass: ["error-snackbar"],
            })
            this.isLoading = false
          },
        })
      },
      error: () => {
        this.snackBar.open("Error checking email. Please try again.", "Close", {
          duration: 5000,
          panelClass: ["error-snackbar"],
        })
        this.isLoading = false
      },
    })
  }
}
