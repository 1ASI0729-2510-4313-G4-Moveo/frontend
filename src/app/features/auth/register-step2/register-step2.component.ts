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
import { MatDialog } from "@angular/material/dialog"

// Angular Material Imports
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { TermsDialogComponent } from "../terms-dialog/terms-dialog.component"

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
    MatCheckboxModule,
  ],
  templateUrl: "./register-step2.component.html",
  styleUrls: ["./register-step2.component.css"],
})
export class RegisterStep2Component {
  registerForm: FormGroup
  selectedFile: File | null = null
  photoPreview: string | null = null
  isLoading = false
  hidePassword = true
  hideRepeatPassword = true
  hasReadTerms = false

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private snackBar: MatSnackBar,
      private dialog: MatDialog,
  ) {
    this.registerForm = this.fb.group(
        {
          fullName: ["", [Validators.required, Validators.minLength(2)]],
          dni: ["", [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
          phone: ["", [Validators.required, Validators.pattern(/^\+?[0-9]{9,15}$/)]],
          email: ["", [Validators.required, Validators.email]],
          password: ["", [Validators.required, Validators.minLength(6)]],
          repeatPassword: ["", Validators.required],
          acceptTerms: [false, Validators.requiredTrue],
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
    const file = event.target.files[0]
    if (file) {
      this.selectedFile = file
      const reader = new FileReader()
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  openTermsDialog(event: Event): void {
    event.preventDefault()
    const dialogRef = this.dialog.open(TermsDialogComponent, {
      width: "600px",
      maxHeight: "80vh",
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "accepted") {
        this.hasReadTerms = true
        this.registerForm.get("acceptTerms")?.enable()
      }
    })
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return

    this.isLoading = true

    const { fullName, dni, phone, email, password } = this.registerForm.value

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
          dni: dni,
          phone,
          email,
          password,
          type: "user" as const,
          avatar: this.photoPreview || undefined,
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
