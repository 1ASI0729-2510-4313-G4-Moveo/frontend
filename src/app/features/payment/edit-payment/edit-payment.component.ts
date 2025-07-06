import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { CommonModule } from "@angular/common"

// Angular Material Imports
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCheckboxModule } from "@angular/material/checkbox"

import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { PaymentService } from "../../../shared/services/payment.service"
import { NotificationService } from "../../../shared/services/notification.service"

@Component({
  selector: "app-edit-payment",
  templateUrl: "./edit-payment.component.html",
  styleUrls: ["./edit-payment.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderBarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
  ],
})
export class EditPaymentComponent implements OnInit {
  paymentForm: FormGroup
  selectedType: "credit" | "debit" | "paypal" = "credit"
  isLoading = false
  isEditing = false
  editingId: string | null = null

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private paymentService: PaymentService,
      private notificationService: NotificationService,
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ["", [Validators.required, Validators.pattern(/^[0-9\s]{13,19}$/)]],
      holderName: ["", Validators.required],
      expiryDate: ["", [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]],
      cvv: ["", [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      isDefault: [false],
    })
  }

  ngOnInit(): void {
    // Check if editing existing payment method
    this.editingId = this.route.snapshot.queryParamMap.get("id")
    if (this.editingId) {
      this.isEditing = true
      this.loadPaymentMethod()
    }

    // Format card number input
    this.paymentForm.get("cardNumber")?.valueChanges.subscribe((value) => {
      if (value) {
        const formatted = value
            .replace(/\s/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim()
        if (formatted !== value) {
          this.paymentForm.get("cardNumber")?.setValue(formatted, { emitEvent: false })
        }
      }
    })

    // Format expiry date input
    this.paymentForm.get("expiryDate")?.valueChanges.subscribe((value) => {
      if (value && value.length === 2 && !value.includes("/")) {
        this.paymentForm.get("expiryDate")?.setValue(value + "/", { emitEvent: false })
      }
    })
  }

  private loadPaymentMethod(): void {
    // In a real app, you would load the payment method by ID
    // For now, we'll just set some default values
    this.paymentForm.patchValue({
      cardNumber: "4532 1234 5678 9012",
      holderName: "John Doe",
      expiryDate: "12/26",
      cvv: "123",
    })
  }

  selectPaymentType(type: "credit" | "debit" | "paypal"): void {
    this.selectedType = type
  }

  connectPaypal(): void {
    // Simulate PayPal connection
    this.isLoading = true
    setTimeout(() => {
      this.notificationService.showSuccess("PayPal account connected successfully!")
      this.router.navigate(["/payment"])
      this.isLoading = false
    }, 2000)
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.notificationService.showError("Please fill in all required fields correctly")
      return
    }

    this.isLoading = true

    const formData = this.paymentForm.value
    const paymentData = {
      type: this.selectedType,
      cardNumber: formData.cardNumber.replace(/\s/g, ""), // Remove spaces
      holderName: formData.holderName,
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
      isDefault: formData.isDefault || false,
    }

    if (this.isEditing && this.editingId) {
      // Update existing payment method
      this.paymentService.updatePaymentMethod(this.editingId, paymentData).subscribe({
        next: () => {
          this.notificationService.showSuccess("Payment method updated successfully!")
          this.router.navigate(["/payment"])
          this.isLoading = false
        },
        error: () => {
          this.notificationService.showError("Error updating payment method")
          this.isLoading = false
        },
      })
    } else {
      // Add new payment method
      this.paymentService.addPaymentMethod(paymentData).subscribe({
        next: () => {
          this.notificationService.showSuccess("Payment method added successfully!")
          this.router.navigate(["/payment"])
          this.isLoading = false
        },
        error: () => {
          this.notificationService.showError("Error adding payment method")
          this.isLoading = false
        },
      })
    }
  }
}
