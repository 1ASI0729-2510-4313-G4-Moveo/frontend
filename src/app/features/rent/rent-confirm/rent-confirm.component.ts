import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { CarService } from "../../../shared/services/car.service"
import { BookingService } from "../../../shared/services/booking.service"
import { AuthService } from "../../auth/auth.service"
import { NotificationService } from "../../../shared/services/notification.service"
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: "app-rent-confirm",
  standalone: true,
  templateUrl: "./rent-confirm.component.html",
  styleUrls: ["./rent-confirm.component.css"],
  imports: [HeaderBarComponent, CommonModule, MatIcon],
})
export class RentConfirmComponent implements OnInit {
  data: any = null
  selectedPlace: string | null = null
  isLoading = false

  constructor(
      private route: ActivatedRoute,
      protected router: Router,
      private carService: CarService,
      private bookingService: BookingService,
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

    this.carService.getCarById(id).subscribe({
      next: (car) => {
        this.data = {
          id: car.id,
          model: `${car.brand} ${car.model}`,
          image: car.image,
          hours: hours,
          total: (car.pricePerHour * hours).toFixed(2),
          car: car,
        }
      },
      error: () => {
        this.notificationService.showError("Car not found")
        this.router.navigate(["/rent"])
      },
    })
  }

  togglePickup(place: string): void {
    if (this.selectedPlace === place) {
      this.selectedPlace = null
      localStorage.removeItem("pickupLocation")
    } else {
      this.selectedPlace = place
      localStorage.setItem("pickupLocation", place)
    }
  }

  isSelected(place: string): boolean {
    return this.selectedPlace === place
  }

  confirmRent(): void {
    if (!this.selectedPlace || !this.data?.id) {
      this.notificationService.showError("Please select a pickup location")
      return
    }

    const currentUser = this.authService.getCurrentUser()
    if (!currentUser) {
      this.notificationService.showError("You must be logged in to make a booking")
      return
    }

    this.isLoading = true

    // Create booking
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
      pickupLocation: this.selectedPlace,
      paymentMethod: "VISA", // Default payment method
    }

    this.bookingService.createBooking(bookingData).subscribe({
      next: (booking) => {
        this.notificationService.showSuccess("Booking confirmed successfully!")
        localStorage.setItem("currentBookingId", booking.id)
        this.router.navigate(["/rent/final-confirm", this.data.id])
        this.isLoading = false
      },
      error: (error) => {
        this.notificationService.showError("Error creating booking. Please try again.")
        this.isLoading = false
      },
    })
  }
}
