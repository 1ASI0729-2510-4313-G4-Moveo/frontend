import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable, tap, catchError, throwError } from "rxjs"
import { AuthService } from "../../features/auth/auth.service"

export interface Booking {
    id: string
    userId: string
    carId: string
    startDate: string
    endDate: string
    hours: number
    totalPrice: number
    status: "active" | "completed" | "cancelled"
    pickupLocation: string
    paymentMethod: string
    createdAt: string
    rating?: number
    review?: string
    carDetails?: {
        brand: string
        model: string
        image: string
        licensePlate: string
    }
}

@Injectable({
    providedIn: "root",
})
export class BookingService {
    private apiUrl = "http://localhost:3000"
    private bookingsSubject = new BehaviorSubject<Booking[]>([])
    public bookings$ = this.bookingsSubject.asObservable()

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {}

    getUserBookings(): Observable<Booking[]> {
        const currentUser = this.authService.getCurrentUser()
        if (!currentUser) {
            return throwError(() => new Error("No user logged in"))
        }

        return this.http.get<Booking[]>(`${this.apiUrl}/bookings?userId=${currentUser.id}`).pipe(
            tap((bookings) => this.bookingsSubject.next(bookings)),
            catchError((error) => {
                console.error("Error loading bookings:", error)
                return throwError(() => error)
            }),
        )
    }

    createBooking(bookingData: Omit<Booking, "id" | "createdAt">): Observable<Booking> {
        const newBooking = {
            ...bookingData,
            createdAt: new Date().toISOString(),
        }

        return this.http.post<Booking>(`${this.apiUrl}/bookings`, newBooking).pipe(
            tap(() => this.getUserBookings().subscribe()), // Reload bookings
            catchError((error) => {
                console.error("Error creating booking:", error)
                return throwError(() => error)
            }),
        )
    }

    updateBooking(id: string, updates: Partial<Booking>): Observable<Booking> {
        return this.http.patch<Booking>(`${this.apiUrl}/bookings/${id}`, updates).pipe(
            tap(() => this.getUserBookings().subscribe()), // Reload bookings
            catchError((error) => {
                console.error("Error updating booking:", error)
                return throwError(() => error)
            }),
        )
    }

    cancelBooking(id: string): Observable<Booking> {
        return this.updateBooking(id, { status: "cancelled" })
    }
}
