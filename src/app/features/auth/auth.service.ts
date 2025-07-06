import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable, tap, map, catchError, throwError } from "rxjs"
import { Router } from "@angular/router"

export interface User {
    id: string
    email: string
    name: string
    phone: string
    type: "user" | "provider"
    avatar?: string
    isVerified?: boolean
    password?: string
    createdAt?: string
    lastLogin?: string
    dni?: string
    providerInfo?: {
        licenseNumber?: string
        rating?: number
        totalEarnings?: number
        carsListed?: number
        totalBookings?: number
    }
}

export interface RegisterUserData {
    email: string
    password: string
    name: string
    phone: string
    type: "user" | "provider"
    licenseNumber?: string
    dni?: string
    avatar?: string
}

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private apiUrl = "http://localhost:3000"
    private currentUserSubject = new BehaviorSubject<User | null>(null)
    public currentUser$ = this.currentUserSubject.asObservable()

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        this.loadUserFromStorage()
    }

    private loadUserFromStorage(): void {
        const userData = localStorage.getItem("currentUser")
        if (userData) {
            this.currentUserSubject.next(JSON.parse(userData))
        }
    }

    loginUser(email: string, password: string, userType: "user" | "provider"): Observable<User> {
        return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
            map((users) => {
                const user = users.find((u) => u.email === email && u.password === password && u.type === userType)
                if (!user) {
                    throw new Error("Invalid credentials or user type")
                }
                return user
            }),
            tap((user) => {
                // Update last login
                this.updateLastLogin(user.id).subscribe()
                this.setCurrentUser(user)
            }),
            catchError((error) => {
                console.error("Login error:", error)
                return throwError(() => new Error("Invalid email, password, or user type"))
            }),
        )
    }

    private updateLastLogin(userId: string): Observable<User> {
        const updateData = {
            lastLogin: new Date().toISOString(),
        }
        return this.http.patch<User>(`${this.apiUrl}/users/${userId}`, updateData)
    }

    register(userData: RegisterUserData): Observable<User> {
        const newUser = {
            email: userData.email,
            password: userData.password,
            name: userData.name,
            phone: userData.phone,
            type: userData.type,
            dni: userData.dni,
            isVerified: false,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            avatar: userData.avatar || `https://i.pravatar.cc/150?u=${userData.email}`,
            ...(userData.type === "provider" && {
                providerInfo: {
                    licenseNumber: userData.licenseNumber || "",
                    rating: 0,
                    totalEarnings: 0,
                    carsListed: 0,
                    totalBookings: 0,
                },
            }),
        }

        return this.http.post<User>(`${this.apiUrl}/users`, newUser).pipe(
            tap((user) => {
                this.setCurrentUser(user)
            }),
            catchError((error) => {
                console.error("Registration error:", error)
                return throwError(() => new Error("Registration failed. Please try again."))
            }),
        )
    }

    private setCurrentUser(user: User): void {
        localStorage.setItem("currentUser", JSON.stringify(user))
        localStorage.setItem("userId", user.id)
        localStorage.setItem("userName", user.name)
        localStorage.setItem("email", user.email)
        localStorage.setItem("type", user.type)
        localStorage.setItem("phone", user.phone)
        if (user.dni) localStorage.setItem("dni", user.dni)
        this.currentUserSubject.next(user)
    }

    logout(): void {
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userId")
        localStorage.removeItem("userName")
        localStorage.removeItem("email")
        localStorage.removeItem("type")
        localStorage.removeItem("phone")
        localStorage.removeItem("dni")
        this.currentUserSubject.next(null)
        this.router.navigate(["/login"])
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem("currentUser")
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value
    }

    getUserRole(): string | null {
        return localStorage.getItem("type")
    }

    getToken(): string | null {
        return localStorage.getItem("currentUser") ? "mock-token" : null
    }

    updateProfile(userData: Partial<User>): Observable<User> {
        const currentUser = this.getCurrentUser()
        if (!currentUser) throw new Error("No user logged in")

        return this.http
            .patch<User>(`${this.apiUrl}/users/${currentUser.id}`, userData)
            .pipe(tap((updatedUser) => this.setCurrentUser(updatedUser)))
    }

    // Check if email already exists
    checkEmailExists(email: string): Observable<boolean> {
        return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}`).pipe(
            map((users) => users.length > 0),
            catchError(() => throwError(() => new Error("Error checking email"))),
        )
    }
}
