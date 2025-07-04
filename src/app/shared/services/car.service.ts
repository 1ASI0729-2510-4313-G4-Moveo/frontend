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
            // Datos de ejemplo con 7 vehículos
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
                    brand: "Hyundai",
                    model: "Accent",
                    year: 2023,
                    licensePlate: "C3M-210",
                    color: "Blue",
                    seats: 5,
                    transmission: "Automatic",
                    pickupPlace: "Rambla San Borja",
                    pricePerHour: 4.0,
                    rating: 4.8,
                    reviews: 89,
                    image: "assets/car3.png",
                    ownerId: "3",
                    isAvailable: true,
                    features: ["Air Conditioning", "GPS", "Backup Camera"],
                    description: "Modern and stylish car with latest features.",
                },
                {
                    id: "4",
                    brand: "Chevrolet",
                    model: "Spark",
                    year: 2022,
                    licensePlate: "E9X-547",
                    color: "Yellow",
                    seats: 4,
                    transmission: "Manual",
                    pickupPlace: "Plaza San Miguel",
                    pricePerHour: 2.8,
                    rating: 4.3,
                    reviews: 45,
                    image: "assets/car4.png",
                    ownerId: "4",
                    isAvailable: true,
                    features: ["Air Conditioning", "Radio"],
                    description: "Compact and fuel-efficient city car.",
                },
                {
                    id: "5",
                    brand: "Hyundai",
                    model: "Tucson",
                    year: 2023,
                    licensePlate: "HT-901",
                    color: "Gray",
                    seats: 7,
                    transmission: "Automatic",
                    pickupPlace: "Playa De Estacionamiento Alcanfores",
                    pricePerHour: 5.2,
                    rating: 4.9,
                    reviews: 156,
                    image: "assets/car5.png",
                    ownerId: "5",
                    isAvailable: true,
                    features: ["Air Conditioning", "GPS", "Leather Seats", "Sunroof"],
                    description: "Spacious SUV perfect for family trips.",
                },
                {
                    id: "6",
                    brand: "Mazda",
                    model: "CX-5",
                    year: 2022,
                    licensePlate: "MZ-352",
                    color: "Black",
                    seats: 5,
                    transmission: "Automatic",
                    pickupPlace: "Mall Aventura Santa Anita",
                    pricePerHour: 4.8,
                    rating: 4.6,
                    reviews: 78,
                    image: "assets/car6.png",
                    ownerId: "6",
                    isAvailable: true,
                    features: ["Air Conditioning", "GPS", "Premium Sound", "Heated Seats"],
                    description: "Premium SUV with excellent performance.",
                },
                {
                    id: "7",
                    brand: "Nissan",
                    model: "Versa",
                    year: 2021,
                    licensePlate: "NV-445",
                    color: "Silver",
                    seats: 5,
                    transmission: "Automatic",
                    pickupPlace: "Rambla San Borja",
                    pricePerHour: 3.2,
                    rating: 4.4,
                    reviews: 92,
                    image: "assets/car7.png",
                    ownerId: "7",
                    isAvailable: true,
                    features: ["Air Conditioning", "Bluetooth", "USB Ports"],
                    description: "Reliable sedan with great fuel economy.",
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
