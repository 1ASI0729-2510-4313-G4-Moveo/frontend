import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { Location } from "@angular/common"
import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { CarService } from "../../../shared/services/car.service"
import { BookingService } from "../../../shared/services/booking.service"
import { NotificationService } from "../../../shared/services/notification.service"
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-rent-final-confirm",
  templateUrl: "./rent-final-confirm.component.html",
  styleUrls: ["./rent-final-confirm.component.css"],
  standalone: true,
  imports: [HeaderBarComponent, CommonModule, MatIcon],
})
export class RentFinalConfirmComponent implements OnInit {
  data: any = null
  bookingId: string | null = null

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
    const pickup = localStorage.getItem("pickupLocation") ?? "-"
    this.bookingId = localStorage.getItem("currentBookingId")

    if (!id || !hours) {
      this.router.navigate(["/rent"])
      return
    }

    this.carService.getCarById(id).subscribe({
      next: (car) => {
        this.data = {
          id: id,
          model: `${car.brand} ${car.model}`,
          plate: car.licensePlate,
          image: car.image,
          hours: hours,
          price: (car.pricePerHour * hours).toFixed(2),
          location: pickup,
        }
      },
      error: () => {
        this.notificationService.showError("Error loading booking details")
        this.router.navigate(["/rent"])
      },
    })
  }

  cancel(): void {
    if (!this.bookingId) {
      this.notificationService.showError("No booking found to cancel")
      return
    }

    if (confirm("Are you sure you want to cancel this booking?")) {
      this.bookingService.cancelBooking(this.bookingId).subscribe({
        next: () => {
          this.notificationService.showSuccess("Booking cancelled successfully")
          localStorage.removeItem("currentBookingId")
          localStorage.removeItem("rentHours")
          localStorage.removeItem("pickupLocation")
          this.router.navigate(["/rent/cancel", this.data.id])
        },
        error: () => {
          this.notificationService.showError("Error cancelling booking")
        },
      })
    }
  }

  goBack(): void {
    this.location.back()
  }

  goToRecords(): void {
    this.router.navigate(["/record"])
  }
}
