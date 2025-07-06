import { Component, OnInit, OnDestroy } from "@angular/core"
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from "rxjs"
import { CommonModule } from "@angular/common"

// Angular Material Imports
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import { MatSliderModule } from "@angular/material/slider"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCardModule } from "@angular/material/card"

import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { CarService, Car, CarFilter } from "../../../shared/services/car.service"
import { NotificationService } from "../../../shared/services/notification.service"

interface FilterChip {
  key: string
  label: string
  value: any
}

@Component({
  selector: "app-rent",
  standalone: true,
  templateUrl: "./rent.component.html",
  styleUrls: ["./rent.component.css"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderBarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
})
export class RentComponent implements OnInit, OnDestroy {
  searchForm: FormGroup
  selectedCar: Car | null = null
  filteredCars: Car[] = []
  availableBrands: string[] = []
  availableLocations: string[] = []
  activeFilters: FilterChip[] = []
  loading = false

  private destroy$ = new Subject<void>()

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private carService: CarService,
      private notificationService: NotificationService,
  ) {
    this.searchForm = this.fb.group({
      hours: [1],
      brand: [""],
      transmission: [""],
      seats: [""],
      pickupPlace: [""],
      minPrice: [0],
      maxPrice: [10],
    })
  }

  ngOnInit(): void {
    this.loadCars()
    this.setupFormSubscriptions()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private loadCars(): void {
    this.loading = true
    this.carService
        .getAvailableCars()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (cars) => {
            this.filteredCars = cars
            this.extractFilterOptions(cars)
            this.loading = false
          },
          error: (error) => {
            this.notificationService.showError("Error loading cars")
            this.loading = false
          },
        })
  }

  private extractFilterOptions(cars: Car[]): void {
    this.availableBrands = [...new Set(cars.map((car) => car.brand))].sort()
    this.availableLocations = [...new Set(cars.map((car) => car.pickupPlace))].sort()
  }

  private setupFormSubscriptions(): void {
    this.searchForm.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe(() => {
          this.applyFilters()
        })
  }

  selectCar(car: Car): void {
    // Navigate directly to rent confirmation when car is clicked
    const hours = this.searchForm.get("hours")?.value
    if (!hours || hours <= 0) {
      this.notificationService.showError("Please enter valid hours")
      return
    }

    localStorage.setItem("rentHours", hours.toString())
    this.router.navigate(["/rent/confirm", car.id])
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0)
  }

  applyFilters(): void {
    const formValue = this.searchForm.value
    const filter: CarFilter = {}

    if (formValue.brand) filter.brand = formValue.brand
    if (formValue.transmission) filter.transmission = formValue.transmission
    if (formValue.seats) filter.seats = formValue.seats
    if (formValue.pickupPlace) filter.pickupPlace = formValue.pickupPlace
    if (formValue.minPrice > 0) filter.minPrice = formValue.minPrice
    if (formValue.maxPrice < 10) filter.maxPrice = formValue.maxPrice

    this.loading = true
    this.carService
        .filterCars(filter)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (cars) => {
            this.filteredCars = cars
            this.updateActiveFilters()
            this.loading = false
          },
          error: () => {
            this.notificationService.showError("Error filtering cars")
            this.loading = false
          },
        })
  }

  private updateActiveFilters(): void {
    const formValue = this.searchForm.value
    this.activeFilters = []

    if (formValue.brand) {
      this.activeFilters.push({ key: "brand", label: `Brand: ${formValue.brand}`, value: formValue.brand })
    }
    if (formValue.transmission) {
      this.activeFilters.push({
        key: "transmission",
        label: `Transmission: ${formValue.transmission}`,
        value: formValue.transmission,
      })
    }
    if (formValue.seats) {
      this.activeFilters.push({ key: "seats", label: `Min Seats: ${formValue.seats}`, value: formValue.seats })
    }
    if (formValue.pickupPlace) {
      this.activeFilters.push({
        key: "pickupPlace",
        label: `Location: ${formValue.pickupPlace}`,
        value: formValue.pickupPlace,
      })
    }
    if (formValue.minPrice > 0 || formValue.maxPrice < 10) {
      this.activeFilters.push({
        key: "price",
        label: `Price: S/${formValue.minPrice} - S/${formValue.maxPrice}`,
        value: { min: formValue.minPrice, max: formValue.maxPrice },
      })
    }
  }

  removeFilter(key: string): void {
    if (key === "price") {
      this.searchForm.patchValue({ minPrice: 0, maxPrice: 10 })
    } else {
      this.searchForm.patchValue({ [key]: "" })
    }
  }

  clearFilters(): void {
    this.searchForm.reset({
      hours: 1,
      brand: "",
      transmission: "",
      seats: "",
      pickupPlace: "",
      minPrice: 0,
      maxPrice: 10,
    })
    this.selectedCar = null
  }
}
