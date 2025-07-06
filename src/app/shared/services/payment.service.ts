import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable, tap, catchError, throwError } from "rxjs"
import { AuthService } from "../../features/auth/auth.service"

export interface PaymentMethod {
    id: string
    userId: string
    type: "credit" | "debit" | "paypal"
    cardNumber: string
    holderName: string
    expiryDate: string
    cvv: string
    isDefault: boolean
    createdAt: string
}

@Injectable({
    providedIn: "root",
})
export class PaymentService {
    private apiUrl = "http://localhost:3000"
    private paymentMethodsSubject = new BehaviorSubject<PaymentMethod[]>([])
    public paymentMethods$ = this.paymentMethodsSubject.asObservable()

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {}

    getUserPaymentMethods(): Observable<PaymentMethod[]> {
        const currentUser = this.authService.getCurrentUser()
        if (!currentUser) {
            return throwError(() => new Error("No user logged in"))
        }

        return this.http.get<PaymentMethod[]>(`${this.apiUrl}/paymentMethods?userId=${currentUser.id}`).pipe(
            tap((methods) => this.paymentMethodsSubject.next(methods)),
            catchError((error) => {
                console.error("Error loading payment methods:", error)
                return throwError(() => error)
            }),
        )
    }

    addPaymentMethod(methodData: Omit<PaymentMethod, "id" | "userId" | "createdAt">): Observable<PaymentMethod> {
        const currentUser = this.authService.getCurrentUser()
        if (!currentUser) {
            return throwError(() => new Error("No user logged in"))
        }

        const newMethod = {
            ...methodData,
            userId: currentUser.id,
            createdAt: new Date().toISOString(),
        }

        return this.http.post<PaymentMethod>(`${this.apiUrl}/paymentMethods`, newMethod).pipe(
            tap(() => this.getUserPaymentMethods().subscribe()),
            catchError((error) => {
                console.error("Error adding payment method:", error)
                return throwError(() => error)
            }),
        )
    }

    updatePaymentMethod(id: string, updates: Partial<PaymentMethod>): Observable<PaymentMethod> {
        return this.http.patch<PaymentMethod>(`${this.apiUrl}/paymentMethods/${id}`, updates).pipe(
            tap(() => this.getUserPaymentMethods().subscribe()),
            catchError((error) => {
                console.error("Error updating payment method:", error)
                return throwError(() => error)
            }),
        )
    }

    deletePaymentMethod(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/paymentMethods/${id}`).pipe(
            tap(() => this.getUserPaymentMethods().subscribe()),
            catchError((error) => {
                console.error("Error deleting payment method:", error)
                return throwError(() => error)
            }),
        )
    }

    setDefaultPaymentMethod(id: string): Observable<PaymentMethod> {
        // First, remove default from all methods
        this.paymentMethodsSubject.value.forEach((method) => {
            if (method.isDefault) {
                this.updatePaymentMethod(method.id, { isDefault: false }).subscribe()
            }
        })

        // Then set the new default
        return this.updatePaymentMethod(id, { isDefault: true })
    }
}
