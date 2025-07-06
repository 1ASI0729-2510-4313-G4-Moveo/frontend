import { Component, OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, Router } from "@angular/router"
import { Subject, takeUntil, forkJoin } from "rxjs"

// Angular Material Imports
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { BookingService, Booking } from "../../../shared/services/booking.service"
import { CarService } from "../../../shared/services/car.service"
import { NotificationService } from "../../../shared/services/notification.service"

@Component({
  selector: "app-record-list",
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderBarComponent, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: "./record-list.component.html",
  styleUrls: ["./record-list.component.css"],
})
export class RecordListComponent implements OnInit, OnDestroy {
  records: Booking[] = []
  filteredRecords: Booking[] = []
  selectedFilter = "all"
  loading = false

  // Stats
  totalHours = 0
  totalTrips = 0
  totalSpent = 0
  averageRating = 0

  private destroy$ = new Subject<void>()

  constructor(
      private router: Router,
      private bookingService: BookingService,
      private carService: CarService,
      private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadRecords()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private loadRecords(): void {
    this.loading = true
    this.bookingService
        .getUserBookings()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (bookings) => {
            this.records = bookings
            this.loadCarDetails()
            this.calculateStats()
            this.filterRecords(this.selectedFilter)
            this.loading = false
          },
          error: (error) => {
            this.notificationService.showError("Error loading records")
            this.loading = false
          },
        })
  }

  private loadCarDetails(): void {
    const carRequests = this.records.map((record) =>
        this.carService.getCarById(record.carId).pipe(takeUntil(this.destroy$)),
    )

    if (carRequests.length > 0) {
      forkJoin(carRequests).subscribe({
        next: (cars) => {
          this.records.forEach((record, index) => {
            const car = cars[index]
            record.carDetails = {
              brand: car.brand,
              model: car.model,
              image: car.image,
              licensePlate: car.licensePlate,
            }
          })
          this.filteredRecords = [...this.records]
        },
        error: (error) => {
          console.error("Error loading car details:", error)
        },
      })
    }
  }

  private calculateStats(): void {
    this.totalTrips = this.records.length
    this.totalHours = this.records.reduce((sum, record) => sum + record.hours, 0)
    this.totalSpent = this.records.reduce((sum, record) => sum + record.totalPrice, 0)

    const ratedRecords = this.records.filter((record) => record.rating)
    this.averageRating =
        ratedRecords.length > 0
            ? ratedRecords.reduce((sum, record) => sum + (record.rating || 0), 0) / ratedRecords.length
            : 0
  }

  filterRecords(filter: string): void {
    this.selectedFilter = filter
    if (filter === "all") {
      this.filteredRecords = [...this.records]
    } else {
      this.filteredRecords = this.records.filter((record) => record.status === filter)
    }
  }

  viewDetail(record: Booking): void {
    this.router.navigate(["/record/detail", record.id])
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case "active":
        return "Active"
      case "completed":
        return "Completed"
      case "cancelled":
        return "Cancelled"
      default:
        return status
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  rateBooking(record: Booking): void {
    // Implement rating functionality
    this.notificationService.showInfo("Rating functionality coming soon!")
  }

  cancelBooking(record: Booking): void {
    if (confirm("Are you sure you want to cancel this booking?")) {
      this.bookingService.cancelBooking(record.id).subscribe({
        next: () => {
          this.notificationService.showSuccess("Booking cancelled successfully")
          this.loadRecords()
        },
        error: () => {
          this.notificationService.showError("Error cancelling booking")
        },
      })
    }
  }
}
