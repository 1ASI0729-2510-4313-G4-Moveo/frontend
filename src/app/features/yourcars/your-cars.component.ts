import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { HeaderBarProviderComponent } from "../../project/components/header-bar-provider/header-bar-provider.component"
import { CarService, Car } from "../../shared/services/car.service"
import { AuthService } from "../auth/auth.service"

@Component({
  selector: "app-your-cars",
  imports: [HeaderBarProviderComponent, CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatChipsModule],
  templateUrl: "./your-cars.component.html",
  styleUrl: "./your-cars.component.css",
  standalone: true
})
export class YourCarsComponent implements OnInit {
  cars: Car[] = []
  loading = false
  currentUserId = ""

  constructor(
      private router: Router,
      private carService: CarService,
      private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadUserCars()
  }

  private loadUserCars(): void {
    this.loading = true
    const currentUser = this.authService.getCurrentUser()

    if (currentUser) {
      this.currentUserId = currentUser.id
      this.carService.getCars().subscribe({
        next: (cars) => {
          this.cars = cars.filter((car) => car.ownerId === this.currentUserId)
          this.loading = false
        },
        error: (error) => {
          console.error("Error loading cars:", error)
          this.loading = false
        },
      })
    } else {
      this.loading = false
      this.router.navigate(["/login"])
    }
  }

  viewDetails(carId: string): void {
    this.router.navigate(["/your-cars/details", carId])
  }

  addNewCar(): void {
    this.router.navigate(["/provide"])
  }

  getStatusText(car: Car): string {
    return car.isAvailable ? "Available" : "Not Available"
  }

  getStatusClass(car: Car): string {
    return car.isAvailable ? "status-available" : "status-unavailable"
  }

  toggleAvailability(car: Car, event: Event): void {
    event.stopPropagation()

    const updatedCar = { ...car, isAvailable: !car.isAvailable }

    this.carService.updateCar(car.id, { isAvailable: updatedCar.isAvailable }).subscribe({
      next: () => {
        this.loadUserCars() // Reload cars to get updated data
      },
      error: (error) => {
        console.error("Error updating car availability:", error)
      },
    })
  }

  deleteCar(car: Car, event: Event): void {
    event.stopPropagation()

    if (confirm(`Are you sure you want to delete ${car.brand} ${car.model}?`)) {
      this.carService.deleteCar(car.id).subscribe({
        next: () => {
          this.loadUserCars() // Reload cars after deletion
        },
        error: (error) => {
          console.error("Error deleting car:", error)
        },
      })
    }
  }
}
