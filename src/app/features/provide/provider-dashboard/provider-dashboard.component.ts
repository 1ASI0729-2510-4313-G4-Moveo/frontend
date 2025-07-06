import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { HeaderBarProviderComponent } from "../../../project/components/header-bar-provider/header-bar-provider.component"
import { AuthService } from "../../auth/auth.service"
import { CarService } from "../../../shared/services/car.service"
import { BookingService } from "../../../shared/services/booking.service"

@Component({
  selector: "app-provider-dashboard",
  templateUrl: "./provider-dashboard.component.html",
  styleUrls: ["./provider-dashboard.component.css"],
  standalone: true,
  imports: [CommonModule, HeaderBarProviderComponent, MatIconModule, MatButtonModule, MatCardModule],
})
export class ProviderDashboardComponent implements OnInit {
  providerName = ""
  userCars: any[] = []
  loading = false

  stats = {
    totalCars: 0,
    activeCars: 0,
    totalBookings: 0,
    monthlyEarnings: 0,
    averageRating: 0,
    totalEarnings: 0,
  }

  recentBookings: any[] = []

  constructor(
      private router: Router,
      private authService: AuthService,
      private carService: CarService,
      private bookingService: BookingService,
  ) {}

  ngOnInit(): void {
    this.loadProviderData()
    this.loadCars()
    this.loadBookings()
  }

  private loadProviderData(): void {
    const currentUser = this.authService.getCurrentUser()
    if (currentUser) {
      this.providerName = currentUser.name
    }
  }

  private loadCars(): void {
    this.loading = true
    this.carService.getCars().subscribe({
      next: (cars) => {
        const currentUser = this.authService.getCurrentUser()
        if (currentUser) {
          this.userCars = cars.filter((car) => car.ownerId === currentUser.id)
          this.stats.totalCars = this.userCars.length
          this.stats.activeCars = this.userCars.filter((car) => car.isAvailable).length

          // Calculate average rating
          if (this.userCars.length > 0) {
            const totalRating = this.userCars.reduce((sum, car) => sum + (car.rating || 0), 0)
            this.stats.averageRating = totalRating / this.userCars.length
          }
        }
        this.loading = false
      },
      error: () => {
        this.loading = false
      },
    })
  }

  private loadBookings(): void {
    // Simulate loading bookings for provider's cars
    this.stats.totalBookings = 15
    this.stats.monthlyEarnings = 450.75
    this.stats.totalEarnings = 1250.5

    this.recentBookings = [
      {
        id: "1",
        carModel: "Toyota Corolla",
        customerName: "Juan Pérez",
        date: "2024-01-25",
        earnings: 15.3,
        status: "completed",
      },
      {
        id: "2",
        carModel: "Hyundai Tucson",
        customerName: "María García",
        date: "2024-01-24",
        earnings: 25.6,
        status: "active",
      },
      {
        id: "3",
        carModel: "Kia Rio",
        customerName: "Carlos López",
        date: "2024-01-23",
        earnings: 12.5,
        status: "completed",
      },
    ]
  }

  goToAddCar(): void {
    this.router.navigate(["/provide"])
  }

  goToMyCars(): void {
    this.router.navigate(["/provide/your-cars"])
  }

  goToCarDetails(carId: string): void {
    this.router.navigate(["/your-cars/details", carId])
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
}
