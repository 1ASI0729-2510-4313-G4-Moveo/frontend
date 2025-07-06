import { Component, OnInit, OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"
import { Subject, takeUntil } from "rxjs"

// Angular Material Imports
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { PaymentService, PaymentMethod } from "../../../shared/services/payment.service"
import { NotificationService } from "../../../shared/services/notification.service"

@Component({
  selector: "app-payment-info",
  templateUrl: "./payment-info.component.html",
  styleUrls: ["./payment-info.component.css"],
  standalone: true,
  imports: [CommonModule, HeaderBarComponent, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
})
export class PaymentInfoComponent implements OnInit, OnDestroy {
  paymentMethods: PaymentMethod[] = []
  loading = false

  private destroy$ = new Subject<void>()

  constructor(
      private router: Router,
      private paymentService: PaymentService,
      private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadPaymentMethods()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private loadPaymentMethods(): void {
    this.loading = true
    this.paymentService
        .getUserPaymentMethods()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (methods) => {
            this.paymentMethods = methods
            this.loading = false
          },
          error: (error) => {
            this.notificationService.showError("Error loading payment methods")
            this.loading = false
          },
        })
  }

  addPaymentMethod(): void {
    this.router.navigate(["/payment/edit"])
  }

  editPaymentMethod(method: PaymentMethod): void {
    this.router.navigate(["/payment/edit"], { queryParams: { id: method.id } })
  }

  deletePaymentMethod(method: PaymentMethod): void {
    if (confirm("Are you sure you want to delete this payment method?")) {
      this.paymentService.deletePaymentMethod(method.id).subscribe({
        next: () => {
          this.notificationService.showSuccess("Payment method deleted successfully")
          this.loadPaymentMethods()
        },
        error: () => {
          this.notificationService.showError("Error deleting payment method")
        },
      })
    }
  }

  setAsDefault(method: PaymentMethod): void {
    this.paymentService.setDefaultPaymentMethod(method.id).subscribe({
      next: () => {
        this.notificationService.showSuccess("Default payment method updated")
        this.loadPaymentMethods()
      },
      error: () => {
        this.notificationService.showError("Error updating default payment method")
      },
    })
  }

  getCardIcon(type: string): string {
    switch (type) {
      case "credit":
        return "credit_card"
      case "debit":
        return "payment"
      case "paypal":
        return "account_balance_wallet"
      default:
        return "payment"
    }
  }

  getCardTypeLabel(type: string): string {
    switch (type) {
      case "credit":
        return "Credit Card"
      case "debit":
        return "Debit Card"
      case "paypal":
        return "PayPal"
      default:
        return "Payment Method"
    }
  }

  getLastFourDigits(cardNumber: string): string {
    return cardNumber.slice(-4)
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}
