import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCardModule } from "@angular/material/card"
import { MatStepperModule } from "@angular/material/stepper"

import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { CarService } from "../../../shared/services/car.service"
import { PaymentService, PaymentMethod } from "../../../shared/services/payment.service"
import { BookingService } from "../../../shared/services/booking.service"
import { AuthService } from "../../auth/auth.service"
import { NotificationService } from "../../../shared/services/notification.service"

@Component({
  selector: "app-rent-payment",
  standalone: true,
  templateUrl: "./rent-payment.component.html",
  styleUrls: ["./rent-payment.component.css"],
  imports: [
    HeaderBarComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatStepperModule,
  ],
})
export class RentPaymentComponent implements OnInit {
  data: any = null
  selectedPaymentMethod: PaymentMethod | null = null
  isProcessing = false
  paymentStep = 1 // 1: Processing, 2: Success, 3: Error
  processingSteps = [
    { label: "Validating payment method", completed: false, active: false },
    { label: "Processing payment", completed: false, active: false },
    { label: "Confirming booking", completed: false, active: false },
    { label: "Sending confirmation", completed: false, active: false },
  ]

  constructor(
      private route: ActivatedRoute,
      protected router: Router,
      private carService: CarService,
      private paymentService: PaymentService,
      private bookingService: BookingService,
      private authService: AuthService,
      private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    const hours = Number(localStorage.getItem("rentHours"))
    const pickupLocation = localStorage.getItem("pickupLocation")
    const paymentMethodId = localStorage.getItem("selectedPaymentMethodId")

    if (!id || !hours || !pickupLocation || !paymentMethodId) {
      this.router.navigate(["/rent"])
      return
    }

    this.loadCarData(id, hours)
    this.loadPaymentMethod(paymentMethodId)
    this.startPaymentProcess()
  }

  private loadCarData(id: string, hours: number): void {
    this.carService.getCarById(id).subscribe({
      next: (car) => {
        const total = car.pricePerHour * hours
        const taxes = total * 0.18
        const serviceFee = 5.0

        this.data = {
          id: car.id,
          model: `${car.brand} ${car.model}`,
          image: car.image,
          hours: hours,
          subtotal: total.toFixed(2),
          taxes: taxes.toFixed(2),
          serviceFee: serviceFee.toFixed(2),
          total: (total + taxes + serviceFee).toFixed(2),
          car: car,
          pickupLocation: localStorage.getItem("pickupLocation"),
        }
      },
      error: () => {
        this.notificationService.showError("Error loading booking details")
        this.router.navigate(["/rent"])
      },
    })
  }

  private loadPaymentMethod(paymentMethodId: string): void {
    this.paymentService.getUserPaymentMethods().subscribe({
      next: (methods) => {
        this.selectedPaymentMethod = methods.find((m) => m.id === paymentMethodId) || null
      },
      error: () => {
        this.notificationService.showError("Error loading payment method")
        this.router.navigate(["/rent"])
      },
    })
  }

  private startPaymentProcess(): void {
    this.isProcessing = true
    this.processPaymentSteps()
  }

  private async processPaymentSteps(): Promise<void> {
    for (let i = 0; i < this.processingSteps.length; i++) {
      this.processingSteps[i].active = true

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

      // Simulate occasional failures (10% chance)
      if (Math.random() < 0.1 && i === 1) {
        this.paymentStep = 3 // Error
        this.processingSteps[i].active = false
        return
      }

      this.processingSteps[i].completed = true
      this.processingSteps[i].active = false
    }

    // Create the booking
    await this.createBooking()
  }

  private async createBooking(): Promise<void> {
    const currentUser = this.authService.getCurrentUser()
    if (!currentUser || !this.data) return

    const startDate = new Date()
    const endDate = new Date(startDate.getTime() + this.data.hours * 60 * 60 * 1000)

    const bookingData = {
      userId: currentUser.id,
      carId: this.data.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      hours: this.data.hours,
      totalPrice: Number.parseFloat(this.data.total),
      status: "active" as const,
      pickupLocation: this.data.pickupLocation,
      paymentMethod: this.selectedPaymentMethod?.type.toUpperCase() || "CARD",
    }

    this.bookingService.createBooking(bookingData).subscribe({
      next: (booking) => {
        localStorage.setItem("currentBookingId", booking.id)
        this.paymentStep = 2 // Success
        this.isProcessing = false
      },
      error: () => {
        this.paymentStep = 3 // Error
        this.isProcessing = false
      },
    })
  }

  proceedToConfirmation(): void {
    this.router.navigate(["/rent/final-confirm", this.data.id])
  }

  retryPayment(): void {
    this.paymentStep = 1
    this.processingSteps.forEach((step) => {
      step.completed = false
      step.active = false
    })
    this.startPaymentProcess()
  }

  goBack(): void {
    this.router.navigate(["/rent/confirm", this.data.id])
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

  getLastFourDigits(cardNumber: string): string {
    return cardNumber.slice(-4)
  }
}
