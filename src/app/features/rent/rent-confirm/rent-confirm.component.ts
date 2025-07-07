import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"

import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { CarService } from "../../../shared/services/car.service"
import { PaymentService, PaymentMethod } from "../../../shared/services/payment.service"
import { AuthService } from "../../auth/auth.service"
import { NotificationService } from "../../../shared/services/notification.service"

@Component({
  selector: "app-rent-confirm",
  standalone: true,
  templateUrl: "./rent-confirm.component.html",
  styleUrls: ["./rent-confirm.component.css"],
  imports: [
    HeaderBarComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule,
  ],
})
export class RentConfirmComponent implements OnInit {
  data: any = null
  selectedPlace: string | null = null
  isLoading = false
  paymentMethods: PaymentMethod[] = []
  loadingPaymentMethods = true
  selectedPaymentMethod: PaymentMethod | null = null

  pickupLocations = [
    {
      name: "Playa de Estacionamiento Luis Alache Ascencio",
      distance: "0.5 km",
      time: "2 min",
      available: true,
    },
    {
      name: "Playa De Estacionamiento Alcanfores",
      distance: "1.2 km",
      time: "5 min",
      available: true,
    },
    {
      name: "Mall Aventura Santa Anita",
      distance: "2.1 km",
      time: "8 min",
      available: false,
    },
    {
      name: "Rambla San Borja",
      distance: "1.8 km",
      time: "7 min",
      available: true,
    },
  ]

  constructor(
      private route: ActivatedRoute,
      protected router: Router,
      private carService: CarService,
      private paymentService: PaymentService,
      private authService: AuthService,
      private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    const hours = Number(localStorage.getItem("rentHours"))

    if (!id || !hours) {
      this.router.navigate(["/rent"])
      return
    }

    this.loadCarData(id, hours)
    this.loadPaymentMethods()
  }

  private loadCarData(id: string, hours: number): void {
    this.carService.getCarById(id).subscribe({
      next: (car) => {
        const total = car.pricePerHour * hours
        const taxes = total * 0.18 // 18% tax
        const serviceFee = 5.0 // Fixed service fee

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
        }
      },
      error: () => {
        this.notificationService.showError("Car not found")
        this.router.navigate(["/rent"])
      },
    })
  }

  private loadPaymentMethods(): void {
    this.loadingPaymentMethods = true
    this.paymentService.getUserPaymentMethods().subscribe({
      next: (methods) => {
        this.paymentMethods = methods
        this.selectedPaymentMethod = methods.find((m) => m.isDefault) || methods[0] || null
        this.loadingPaymentMethods = false
      },
      error: () => {
        this.paymentMethods = []
        this.loadingPaymentMethods = false
      },
    })
  }

  togglePickup(location: any): void {
    if (!location.available) return

    if (this.selectedPlace === location.name) {
      this.selectedPlace = null
      localStorage.removeItem("pickupLocation")
    } else {
      this.selectedPlace = location.name
      localStorage.setItem("pickupLocation", location.name)
    }
  }

  isSelected(locationName: string): boolean {
    return this.selectedPlace === locationName
  }

  selectPaymentMethod(method: PaymentMethod): void {
    this.selectedPaymentMethod = method
  }

  addPaymentMethod(): void {
    this.router.navigate(["/payment/edit"], {
      queryParams: { returnUrl: this.router.url },
    })
  }

  proceedToPayment(): void {
    if (!this.selectedPlace) {
      this.notificationService.showError("Please select a pickup location")
      return
    }

    if (!this.selectedPaymentMethod) {
      this.notificationService.showError("Please select a payment method")
      return
    }

    // Store payment method for next step
    localStorage.setItem("selectedPaymentMethodId", this.selectedPaymentMethod.id)

    // Navigate to payment processing
    this.router.navigate(["/rent/payment", this.data.id])
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
