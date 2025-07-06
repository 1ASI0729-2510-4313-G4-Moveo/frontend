import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
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
  selector: "app-register-step3",
  standalone: true,
  templateUrl: "./register-step3.component.html",
  styleUrls: ["./register-step3.component.css"],
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
})
export class RegisterStep3Component {
  securityForm: FormGroup
  insuranceFile: File | null = null
  cardFile: File | null = null
  selectedFile: File | null = null
  photoPreview: string | null = null
  isLoading = false
  hidePassword = true
  hideRepeatPassword = true
  hasReadTerms = false

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog,
  ) {
    this.securityForm = this.fb.group(
        {
          fullName: ["", [Validators.required, Validators.minLength(2)]],
          phone: ["", [Validators.required, Validators.pattern(/^\+?[0-9]{9,15}$/)]],
          dni: ["", [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
          email: ["", [Validators.required, Validators.email]],
          password: ["", [Validators.required, Validators.minLength(6)]],
          repeatPassword: ["", Validators.required],
          acceptTerms: [false, Validators.requiredTrue],
        },
        { validators: this.passwordMatchValidator },
    )
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get("password")?.value
    const confirm = form.get("repeatPassword")?.value
    return password === confirm ? null : { mismatch: true }
  }

  onInsuranceSelected(event: any): void {
    const file = event.target.files[0]
    if (file) this.insuranceFile = file
  }

  onCardSelected(event: any): void {
    const file = event.target.files[0]
    if (file) this.cardFile = file
  }

  onPhotoSelected(event: any): void {
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
        this.securityForm.get("acceptTerms")?.enable()
      }
    })
  }

  onSubmit(): void {
    if (this.securityForm.invalid) return

    this.isLoading = true

    const { fullName, phone, dni, email, password } = this.securityForm.value

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
        const userData = {
          name: fullName,
          phone: phone,
          dni: dni,
          email: email,
          password: password,
          type: "provider" as const,
          licenseNumber: dni,
          avatar: this.photoPreview || undefined,
        }

        this.authService.register(userData).subscribe({
          next: (user) => {
            this.snackBar.open("Provider registration successful! Welcome to Moveo!", "Close", {
              duration: 3000,
              panelClass: ["success-snackbar"],
            })
            this.router.navigate(["/provider/profile"])
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
