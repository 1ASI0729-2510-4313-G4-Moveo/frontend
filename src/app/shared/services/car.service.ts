import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable, of } from "rxjs"

export interface Car {
    id: string
    brand: string
    model: string
    year: number
    licensePlate: string
    color: string
    seats: number
    transmission: "Manual" | "Automatic"
    pickupPlace: string
    pricePerHour: number
    rating: number
    reviews: number
    image: string
    ownerId: string
    isAvailable: boolean
    features: string[]
    description?: string
}

export interface CarFilter {
    brand?: string
    transmission?: string
    minPrice?: number
    maxPrice?: number
    seats?: number
    pickupPlace?: string
}

@Injectable({
    providedIn: "root",
})
export class CarService {
    private carsSubject = new BehaviorSubject<Car[]>([])
    public cars$ = this.carsSubject.asObservable()

    constructor(private http: HttpClient) {
        this.loadCars()
    }

    private loadCars(): void {
        const stored = localStorage.getItem("cars")
        if (stored) {
            this.carsSubject.next(JSON.parse(stored))
        } else {
            // Datos de ejemplo
            const mockCars: Car[] = [
                {
                    id: "1",
                    brand: "Toyota",
                    model: "Corolla",
                    year: 2022,
                    licensePlate: "CZT-728",
                    color: "White",
                    seats: 5,
                    transmission: "Automatic",
                    pickupPlace: "Playa De Estacionamiento Alcanfores",
                    pricePerHour: 3.06,
                    rating: 4.7,
                    reviews: 134,
                    image: "assets/car1.png",
                    ownerId: "1",
                    isAvailable: true,
                    features: ["Air Conditioning", "GPS", "Bluetooth"],
                    description: "Comfortable and reliable car perfect for city trips.",
                },
                {
                    id: "2",
                    brand: "Kia",
                    model: "Rio",
                    year: 2021,
                    licensePlate: "B7J-889",
                    color: "Red",
                    seats: 5,
                    transmission: "Manual",
                    pickupPlace: "Mall Aventura Santa Anita",
                    pricePerHour: 3.5,
                    rating: 4.5,
                    reviews: 65,
                    image: "assets/car2.png",
                    ownerId: "2",
                    isAvailable: true,
                    features: ["Air Conditioning", "USB Ports"],
                    description: "Economic and efficient car for daily use.",
                },
                {
                    id: "3",
                    brand: "Ford",
                    model: "Focus",
                    year: 2020,
                    licensePlate: "D5K-456",
                    color: "Blue",
                    seats: 5,
                    transmission: "Automatic",
                    pickupPlace: "Plaza Norte",
                    pricePerHour: 4.0,
                    rating: 4.8,
                    reviews: 200,
                    image: "assets/car3.png",
                    ownerId: "3",
                    isAvailable: true,
                    features: ["Leather Seats", "Sunroof"],
                    description: "Stylish car with advanced features for a smooth ride.",
                },
            ]
            this.carsSubject.next(mockCars)
            this.saveCars()
        }
    }

    private saveCars(): void {
        localStorage.setItem("cars", JSON.stringify(this.carsSubject.value))
    }

    getCars(): Observable<Car[]> {
        return this.cars$
    }

    getCarById(id: string): Observable<Car | undefined> {
        const car = this.carsSubject.value.find((c) => c.id === id)
        return of(car)
    }

    getAvailableCars(): Observable<Car[]> {
        const availableCars = this.carsSubject.value.filter((car) => car.isAvailable)
        return of(availableCars)
    }

    filterCars(filter: CarFilter): Observable<Car[]> {
        let filteredCars = this.carsSubject.value.filter((car) => car.isAvailable)

        if (filter.brand) {
            filteredCars = filteredCars.filter((car) => car.brand.toLowerCase().includes(filter.brand!.toLowerCase()))
        }

        if (filter.transmission) {
            filteredCars = filteredCars.filter((car) => car.transmission === filter.transmission)
        }

        if (filter.minPrice !== undefined) {
            filteredCars = filteredCars.filter((car) => car.pricePerHour >= filter.minPrice!)
        }

        if (filter.maxPrice !== undefined) {
            filteredCars = filteredCars.filter((car) => car.pricePerHour <= filter.maxPrice!)
        }

        if (filter.seats) {
            filteredCars = filteredCars.filter((car) => car.seats >= filter.seats!)
        }

        if (filter.pickupPlace) {
            filteredCars = filteredCars.filter((car) => car.pickupPlace === filter.pickupPlace)
        }

        return of(filteredCars)
    }

    addCar(car: Omit<Car, "id">): Observable<Car> {
        const newCar: Car = {
            ...car,
            id: Date.now().toString(),
        }

        const current = this.carsSubject.value
        this.carsSubject.next([...current, newCar])
        this.saveCars()

        return of(newCar)
    }

    updateCar(id: string, updates: Partial<Car>): Observable<Car | null> {
        const cars = this.carsSubject.value
        const index = cars.findIndex((c) => c.id === id)

        if (index === -1) return of(null)

        const updatedCar = { ...cars[index], ...updates }
        cars[index] = updatedCar

        this.carsSubject.next([...cars])
        this.saveCars()

        return of(updatedCar)
    }

    deleteCar(id: string): Observable<boolean> {
        const cars = this.carsSubject.value.filter((c) => c.id !== id)
        this.carsSubject.next(cars)
        this.saveCars()
        return of(true)
    }
}
