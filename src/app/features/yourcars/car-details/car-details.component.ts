import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatChipsModule } from "@angular/material/chips"
import { MatTabsModule } from "@angular/material/tabs"
import { HeaderBarProviderComponent } from "../../../project/components/header-bar-provider/header-bar-provider.component"
import { CarService, Car } from "../../../shared/services/car.service"
import { AuthService } from "../../auth/auth.service"

@Component({
  selector: "app-car-details",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatTabsModule,
    HeaderBarProviderComponent,
  ],
  templateUrl: "./car-details.component.html",
  styleUrls: ["./car-details.component.css"],
})
export class CarDetailsComponent implements OnInit {
  car: Car | null = null
  carForm: FormGroup
  loading = false
  editing = false
  carId = ""

  transmissionOptions = ["Manual", "Automatic"]
  fuelTypeOptions = ["Gasoline", "Diesel", "Electric", "Hybrid"]

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private carService: CarService,
      private authService: AuthService,
      private fb: FormBuilder,
  ) {
    this.carForm = this.fb.group({
      brand: ["", Validators.required],
      model: ["", Validators.required],
      year: ["", [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear() + 1)]],
      licensePlate: ["", Validators.required],
      color: ["", Validators.required],
      seats: ["", [Validators.required, Validators.min(2), Validators.max(8)]],
      transmission: ["", Validators.required],
      pickupPlace: ["", Validators.required],
      pricePerHour: ["", [Validators.required, Validators.min(1)]],
      fuelType: [""],
      mileage: ["", Validators.min(0)],
      description: [""],
      isAvailable: [true],
    })
  }

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get("id") || ""
    if (this.carId) {
      this.loadCarDetails()
    }
  }

  private loadCarDetails(): void {
    this.loading = true
    this.carService.getCarById(this.carId).subscribe({
      next: (car) => {
        const currentUser = this.authService.getCurrentUser()
        if (currentUser && car.ownerId === currentUser.id) {
          this.car = car
          this.populateForm()
        } else {
          this.router.navigate(["/your-cars"])
        }
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading car details:", error)
        this.loading = false
        this.router.navigate(["/your-cars"])
      },
    })
  }

  private populateForm(): void {
    if (this.car) {
      this.carForm.patchValue({
        brand: this.car.brand,
        model: this.car.model,
        year: this.car.year,
        licensePlate: this.car.licensePlate,
        color: this.car.color,
        seats: this.car.seats,
        transmission: this.car.transmission,
        pickupPlace: this.car.pickupPlace,
        pricePerHour: this.car.pricePerHour,
        fuelType: this.car.fuelType || "",
        mileage: this.car.mileage || "",
        description: this.car.description || "",
        isAvailable: this.car.isAvailable,
      })
    }
  }

  toggleEdit(): void {
    this.editing = !this.editing
    if (!this.editing) {
      this.populateForm() // Reset form if canceling edit
    }
  }

  onSubmit(): void {
    if (this.carForm.valid && this.car) {
      this.loading = true
      const updatedCar = {
        ...this.carForm.value,
        pricePerHour: Number.parseFloat(this.carForm.value.pricePerHour),
        year: Number.parseInt(this.carForm.value.year),
        seats: Number.parseInt(this.carForm.value.seats),
        mileage: this.carForm.value.mileage ? Number.parseInt(this.carForm.value.mileage) : undefined,
      }

      this.carService.updateCar(this.car.id, updatedCar).subscribe({
        next: () => {
          this.editing = false
          this.loadCarDetails() // Reload to get updated data
        },
        error: (error) => {
          console.error("Error updating car:", error)
          this.loading = false
        },
      })
    }
  }

  toggleAvailability(): void {
    if (this.car) {
      this.loading = true
      const newAvailability = !this.car.isAvailable

      this.carService.updateCar(this.car.id, { isAvailable: newAvailability }).subscribe({
        next: () => {
          this.loadCarDetails()
        },
        error: (error) => {
          console.error("Error updating availability:", error)
          this.loading = false
        },
      })
    }
  }

  deleteCar(): void {
    if (this.car && confirm(`Are you sure you want to delete ${this.car.brand} ${this.car.model}?`)) {
      this.loading = true
      this.carService.deleteCar(this.car.id).subscribe({
        next: () => {
          this.router.navigate(["/your-cars"])
        },
        error: (error) => {
          console.error("Error deleting car:", error)
          this.loading = false
        },
      })
    }
  }

  goBack(): void {
    this.router.navigate(["/your-cars"])
  }

  getStatusText(): string {
    return this.car?.isAvailable ? "Available for Rent" : "Not Available"
  }

  getStatusClass(): string {
    return this.car?.isAvailable ? "status-available" : "status-unavailable"
  }
}
