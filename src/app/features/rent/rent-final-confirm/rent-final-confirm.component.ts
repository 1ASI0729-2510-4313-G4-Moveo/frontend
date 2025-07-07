import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { Location } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"

import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { CarService } from "../../../shared/services/car.service"
import { BookingService } from "../../../shared/services/booking.service"
import { NotificationService } from "../../../shared/services/notification.service"

@Component({
  selector: "app-rent-final-confirm",
  templateUrl: "./rent-final-confirm.component.html",
  styleUrls: ["./rent-final-confirm.component.css"],
  standalone: true,
  imports: [HeaderBarComponent, CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatChipsModule],
})
export class RentFinalConfirmComponent implements OnInit {
  data: any = null
  bookingId: string | null = null
  showCancelConfirm = false

  constructor(
      private route: ActivatedRoute,
      protected router: Router,
      private location: Location,
      private carService: CarService,
      private bookingService: BookingService,
      private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    const hours = Number(localStorage.getItem("rentHours"))
    const pickup = localStorage.getItem("pickupLocation") ?? "Not specified"
    this.bookingId = localStorage.getItem("currentBookingId")

    if (!id || !hours) {
      this.router.navigate(["/rent"])
      return
    }

    this.loadBookingDetails(id, hours, pickup)
  }

  private loadBookingDetails(id: string, hours: number, pickup: string): void {
    this.carService.getCarById(id).subscribe({
      next: (car) => {
        const total = car.pricePerHour * hours
        const taxes = total * 0.18
        const serviceFee = 5.0
        const finalTotal = total + taxes + serviceFee

        this.data = {
          id: id,
          model: `${car.brand} ${car.model}`,
          plate: car.licensePlate,
          image: car.image,
          hours: hours,
          subtotal: total.toFixed(2),
          taxes: taxes.toFixed(2),
          serviceFee: serviceFee.toFixed(2),
          total: finalTotal.toFixed(2),
          location: pickup,
          bookingDate: new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          bookingTime: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }
      },
      error: () => {
        this.notificationService.showError("Error loading booking details")
        this.router.navigate(["/rent"])
      },
    })
  }

  toggleCancelConfirm(): void {
    this.showCancelConfirm = !this.showCancelConfirm
  }

  cancelBooking(): void {
    if (!this.bookingId) {
      this.notificationService.showError("No booking found to cancel")
      return
    }

    this.bookingService.cancelBooking(this.bookingId).subscribe({
      next: () => {
        this.notificationService.showSuccess("Booking cancelled successfully")
        this.clearBookingData()
        this.router.navigate(["/rent/cancel", this.data.id])
      },
      error: () => {
        this.notificationService.showError("Error cancelling booking")
      },
    })
  }

  goToRecords(): void {
    this.clearBookingData()
    this.router.navigate(["/record"])
  }

  goToRentMore(): void {
    this.clearBookingData()
    this.router.navigate(["/rent"])
  }

  private clearBookingData(): void {
    localStorage.removeItem("currentBookingId")
    localStorage.removeItem("rentHours")
    localStorage.removeItem("pickupLocation")
    localStorage.removeItem("selectedPaymentMethodId")
  }

  downloadReceipt(): void {
    // Simulate receipt download
    this.notificationService.showSuccess("Receipt downloaded successfully!")
  }

  shareBooking(): void {
    if (navigator.share) {
      navigator.share({
        title: "My Car Rental Booking",
        text: `I just booked a ${this.data.model} for ${this.data.hours} hours!`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      this.notificationService.showSuccess("Booking link copied to clipboard!")
    }
  }
}
