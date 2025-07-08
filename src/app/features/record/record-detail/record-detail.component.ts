import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { Location } from "@angular/common"
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule, MatDialog } from "@angular/material/dialog"
import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { BookingService } from "../../../shared/services/booking.service"
import { CarService } from "../../../shared/services/car.service"
import { NotificationService } from "../../../shared/services/notification.service"
import { RatingDialogComponent } from "../rating-dialog/rating-dialog.component"

@Component({
  selector: "app-record-detail",
  standalone: true,
  imports: [CommonModule, HeaderBarComponent, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: "./record-detail.component.html",
  styleUrls: ["./record-detail.component.css"],
})
export class RecordDetailComponent implements OnInit {
  booking: any = null
  car: any = null
  loading = false

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private bookingService: BookingService,
      private carService: CarService,
      private notificationService: NotificationService,
      private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.loadBookingDetails(id)
    } else {
      this.router.navigate(["/record"])
    }
  }

  private loadBookingDetails(id: string): void {
    this.loading = true

    this.bookingService.getBookingById(id).subscribe({
      next: (booking) => {
        this.booking = booking

        this.carService.getCarById(this.booking.carId).subscribe({
          next: (car) => {
            this.car = car
            this.loading = false
          },
          error: () => {
            this.notificationService.showError("Error loading car details")
            this.loading = false
          },
        })
      },
      error: () => {
        this.notificationService.showError("Error loading booking details")
        this.router.navigate(["/record"])
      },
    })
  }

  completeTrip(): void {
    if (this.booking.status === "active") {
      this.bookingService.updateBooking(this.booking.id, { status: "completed" }).subscribe({
        next: () => {
          this.booking.status = "completed"
          this.notificationService.showSuccess("Trip completed successfully!")
        },
        error: () => {
          this.notificationService.showError("Error completing trip")
        },
      })
    }
  }

  openRatingDialog(): void {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      width: "500px",
      data: {
        carModel: `${this.car?.brand} ${this.car?.model}`,
        currentRating: this.booking.rating || 0,
        currentReview: this.booking.review || "",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateRating(result.rating, result.review)
      }
    })
  }

  private updateRating(rating: number, review: string): void {
    // Update booking with rating and review
    this.bookingService.updateBooking(this.booking.id, { rating, review }).subscribe({
      next: () => {
        this.booking.rating = rating
        this.booking.review = review

        // Update car's overall rating
        if (this.car) {
          this.updateCarRating(rating)
        }

        this.notificationService.showSuccess("Rating submitted successfully!")
      },
      error: () => {
        this.notificationService.showError("Error submitting rating")
      },
    })
  }

  private updateCarRating(newRating: number): void {
    // Calculate new average rating for the car
    const currentRating = this.car.rating || 0
    const currentReviews = this.car.reviews || 0
    const totalRating = currentRating * currentReviews + newRating
    const newReviews = currentReviews + 1
    const newAverageRating = totalRating / newReviews

    this.carService
        .updateCar(this.car.id, {
          rating: Number.parseFloat(newAverageRating.toFixed(1)),
          reviews: newReviews,
        })
        .subscribe({
          next: () => {
            this.car.rating = Number.parseFloat(newAverageRating.toFixed(1))
            this.car.reviews = newReviews
          },
          error: () => {
            console.error("Error updating car rating")
          },
        })
  }

  archiveRecord(): void {
    this.router.navigate(["/record/confirmation", this.booking.id])
  }

  goBack(): void {
    this.location.back()
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "active":
        return "#4caf50"
      case "completed":
        return "#2196f3"
      case "cancelled":
        return "#f44336"
      default:
        return "#666"
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0)
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  calculateDuration(): string {
    const start = new Date(this.booking.startDate)
    const end = new Date(this.booking.endDate)
    const diffMs = end.getTime() - start.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${diffHours}h ${diffMinutes}m`
  }
}
