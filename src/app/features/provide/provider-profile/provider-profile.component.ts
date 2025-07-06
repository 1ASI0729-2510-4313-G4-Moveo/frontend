import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { HeaderBarProviderComponent } from "../../../project/components/header-bar-provider/header-bar-provider.component"
import { AuthService } from "../../auth/auth.service"
import { CarService } from "../../../shared/services/car.service"
import { BookingService } from "../../../shared/services/booking.service"

@Component({
  selector: "app-provider-profile",
  templateUrl: "./provider-profile.component.html",
  styleUrls: ["./provider-profile.component.css"],
  standalone: true,
  imports: [CommonModule, HeaderBarProviderComponent, MatIconModule, MatButtonModule],
})
export class ProviderProfileComponent implements OnInit {
  providerName = ""
  providerEmail = ""
  providerPhone = ""
  providerAvatar = ""

  stats = {
    carsListed: 0,
    totalEarnings: 0,
    bookings: 0,
    avgRating: 0,
    monthlyBookings: 0,
    activeHours: 0,
  }

  recentActivities = [
    {
      icon: "directions_car",
      title: "New car added: Toyota Corolla",
      time: "2 hours ago",
    },
    {
      icon: "event",
      title: "Booking confirmed for Hyundai Tucson",
      time: "5 hours ago",
    },
    {
      icon: "star",
      title: "Received 5-star rating",
      time: "1 day ago",
    },
    {
      icon: "attach_money",
      title: "Payment received: S/ 45.60",
      time: "2 days ago",
    },
  ]

  constructor(
      private router: Router,
      private authService: AuthService,
      private carService: CarService,
      private bookingService: BookingService,
  ) {}

  ngOnInit(): void {
    this.loadProviderData()
    this.loadStats()
  }

  private loadProviderData(): void {
    const currentUser = this.authService.getCurrentUser()
    if (currentUser) {
      this.providerName = currentUser.name
      this.providerEmail = currentUser.email
      this.providerPhone = currentUser.phone
      this.providerAvatar = currentUser.avatar || ""

      // Load provider-specific stats
      if (currentUser.providerInfo) {
        this.stats.totalEarnings = currentUser.providerInfo.totalEarnings || 0
        this.stats.avgRating = currentUser.providerInfo.rating || 0
        this.stats.bookings = currentUser.providerInfo.totalBookings || 0
      }
    }
  }

  private loadStats(): void {
    // Load cars count
    this.carService.getCars().subscribe({
      next: (cars) => {
        const currentUser = this.authService.getCurrentUser()
        if (currentUser) {
          const userCars = cars.filter((car) => car.ownerId === currentUser.id)
          this.stats.carsListed = userCars.length
        }
      },
    })

    // Load additional stats
    this.stats.monthlyBookings = 8
    this.stats.activeHours = 24
  }

  goToAddCar(): void {
    this.router.navigate(["/provide"])
  }

  goToMyCars(): void {
    this.router.navigate(["/provide/your-cars"])
  }

  goToEarnings(): void {
    // Implement earnings page
    this.router.navigate(["/provider/earnings"])
  }

  goToEditProfile(): void {
    this.router.navigate(["/provide/profile/edit"])
  }
}
