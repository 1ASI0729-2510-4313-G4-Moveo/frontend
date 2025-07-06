import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable, tap, catchError, throwError } from "rxjs"

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
    fuelType?: string
    mileage?: number
    createdAt?: string
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
    private apiUrl = "http://localhost:3000"
    private carsSubject = new BehaviorSubject<Car[]>([])
    public cars$ = this.carsSubject.asObservable()

    constructor(private http: HttpClient) {
        this.loadCars()
    }

    private loadCars(): void {
        this.http
            .get<Car[]>(`${this.apiUrl}/cars`)
            .pipe(
                tap((cars) => this.carsSubject.next(cars)),
                catchError((error) => {
                    console.error("Error loading cars:", error)
                    return throwError(() => error)
                }),
            )
            .subscribe()
    }

    getCars(): Observable<Car[]> {
        return this.http.get<Car[]>(`${this.apiUrl}/cars`)
    }

    getCarById(id: string): Observable<Car> {
        return this.http.get<Car>(`${this.apiUrl}/cars/${id}`)
    }

    getAvailableCars(): Observable<Car[]> {
        return this.http.get<Car[]>(`${this.apiUrl}/cars?isAvailable=true`)
    }

    filterCars(filter: CarFilter): Observable<Car[]> {
        let queryParams = "?isAvailable=true"

        if (filter.brand) {
            queryParams += `&brand_like=${filter.brand}`
        }
        if (filter.transmission) {
            queryParams += `&transmission=${filter.transmission}`
        }
        if (filter.seats) {
            queryParams += `&seats_gte=${filter.seats}`
        }
        if (filter.pickupPlace) {
            queryParams += `&pickupPlace=${filter.pickupPlace}`
        }

        return this.http.get<Car[]>(`${this.apiUrl}/cars${queryParams}`).pipe(
            tap((cars) => {
                // Apply price filters on client side since json-server doesn't support range queries well
                let filteredCars = cars
                if (filter.minPrice !== undefined) {
                    filteredCars = filteredCars.filter((car) => car.pricePerHour >= filter.minPrice!)
                }
                if (filter.maxPrice !== undefined) {
                    filteredCars = filteredCars.filter((car) => car.pricePerHour <= filter.maxPrice!)
                }
                this.carsSubject.next(filteredCars)
            }),
        )
    }

    addCar(car: Omit<Car, "id">): Observable<Car> {
        const newCar = {
            ...car,
            createdAt: new Date().toISOString(),
        }

        return this.http.post<Car>(`${this.apiUrl}/cars`, newCar).pipe(
            tap(() => this.loadCars()), // Reload cars after adding
            catchError((error) => {
                console.error("Error adding car:", error)
                return throwError(() => error)
            }),
        )
    }

    updateCar(id: string, updates: Partial<Car>): Observable<Car> {
        return this.http.patch<Car>(`${this.apiUrl}/cars/${id}`, updates).pipe(
            tap(() => this.loadCars()), // Reload cars after updating
            catchError((error) => {
                console.error("Error updating car:", error)
                return throwError(() => error)
            }),
        )
    }

    deleteCar(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/cars/${id}`).pipe(
            tap(() => this.loadCars()), // Reload cars after deleting
            catchError((error) => {
                console.error("Error deleting car:", error)
                return throwError(() => error)
            }),
        )
    }
}
