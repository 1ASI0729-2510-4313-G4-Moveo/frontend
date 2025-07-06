import { Component } from "@angular/core"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"

// Angular Material Imports
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

import { HeaderBarProviderComponent } from "../../../project/components/header-bar-provider/header-bar-provider.component"
import { CarService } from "../../../shared/services/car.service"
import { AuthService } from "../../auth/auth.service"
import { NotificationService } from "../../../shared/services/notification.service"

@Component({
  selector: "app-provide",
  templateUrl: "./provide.component.html",
  styleUrls: ["./provide.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderBarProviderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class ProvideComponent {
  provideForm: FormGroup
  carImage: string | null = null
  selectedFeatures: string[] = []
  isLoading = false

  availableFeatures = [
    { value: "Air Conditioning", label: "Air Conditioning", icon: "ac_unit" },
    { value: "GPS", label: "GPS Navigation", icon: "navigation" },
    { value: "Bluetooth", label: "Bluetooth", icon: "bluetooth" },
    { value: "USB Ports", label: "USB Ports", icon: "usb" },
    { value: "Backup Camera", label: "Backup Camera", icon: "videocam" },
    { value: "Heated Seats", label: "Heated Seats", icon: "airline_seat_legroom_extra" },
    { value: "Sunroof", label: "Sunroof", icon: "wb_sunny" },
    { value: "Premium Sound", label: "Premium Sound", icon: "volume_up" },
    { value: "Leather Seats", label: "Leather Seats", icon: "event_seat" },
    { value: "Parking Sensors", label: "Parking Sensors", icon: "sensors" },
    { value: "Keyless Entry", label: "Keyless Entry", icon: "key" },
    { value: "Cruise Control", label: "Cruise Control", icon: "speed" },
  ]

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private carService: CarService,
      private authService: AuthService,
      private notificationService: NotificationService,
  ) {
    this.provideForm = this.fb.group({
      brand: ["", Validators.required],
      model: ["", Validators.required],
      year: ["", [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear() + 1)]],
      licensePlate: ["", [Validators.required, Validators.pattern(/^[A-Z0-9]{3}-?[0-9]{3}$/)]],
      color: ["", Validators.required],
      seats: ["", Validators.required],
      transmission: ["", Validators.required],
      pickupPlace: ["", Validators.required],
      pricePerHour: ["", [Validators.required, Validators.min(0.1)]],
      fuelType: ["Gasoline", Validators.required],
      mileage: ["", [Validators.required, Validators.min(0)]],
      description: [""],
    })
  }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement
    const file = fileInput.files?.[0]

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        this.notificationService.showError("Please select a valid image file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.notificationService.showError("Image size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        this.carImage = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  removePhoto(): void {
    this.carImage = null
  }

  toggleFeature(feature: string): void {
    const index = this.selectedFeatures.indexOf(feature)
    if (index > -1) {
      this.selectedFeatures.splice(index, 1)
    } else {
      this.selectedFeatures.push(feature)
    }
  }

  submitForm(): void {
    if (this.provideForm.invalid) {
      this.notificationService.showError("Please fill in all required fields")
      return
    }

    const currentUser = this.authService.getCurrentUser()
    if (!currentUser) {
      this.notificationService.showError("You must be logged in to add a vehicle")
      return
    }

    this.isLoading = true

    const formData = this.provideForm.value
    const newCar = {
      brand: formData.brand,
      model: formData.model,
      year: Number.parseInt(formData.year),
      licensePlate: formData.licensePlate.toUpperCase(),
      color: formData.color,
      seats: Number.parseInt(formData.seats),
      transmission: formData.transmission,
      pickupPlace: formData.pickupPlace,
      pricePerHour: Number.parseFloat(formData.pricePerHour),
      fuelType: formData.fuelType,
      mileage: Number.parseInt(formData.mileage),
      description: formData.description || `${formData.brand} ${formData.model} - Comfortable and reliable vehicle.`,
      image: this.carImage || "/placeholder.svg?height=200&width=300",
      ownerId: currentUser.id,
      isAvailable: true,
      features: this.selectedFeatures,
      rating: 0,
      reviews: 0,
    }

    this.carService.addCar(newCar).subscribe({
      next: (car) => {
        this.notificationService.showSuccess("Vehicle added successfully!")
        this.router.navigate(["/provide/success"])
        this.isLoading = false
      },
      error: (error) => {
        this.notificationService.showError("Error adding vehicle. Please try again.")
        this.isLoading = false
      },
    })
  }
}
