import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, tap } from "rxjs"
import { Router } from "@angular/router"

export interface User {
    id: string
    email: string
    password: string
    name: string
    phone: string
    type: "user" | "provider"
    avatar?: string
    isVerified?: boolean
}

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private apiUrl = "https://682838426b7628c529129386.mockapi.io/api/users"
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

    login(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl)
    }

    loginUser(email: string, password: string): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl).pipe(
            tap((users) => {
                const user = users.find((u) => u.email === email && u.password === password)
                if (user) {
                    this.setCurrentUser(user)
                }
            }),
        )
    }

    register(user: any): Observable<User> {
        return this.http
            .post<User>(this.apiUrl, {
                email: user.email,
                password: user.password,
                name: user.name,
                phone: user.phone,
                type: user.type,
                isVerified: false,
            })
            .pipe(tap((newUser) => this.setCurrentUser(newUser)))
    }

    private setCurrentUser(user: User): void {
        localStorage.setItem("currentUser", JSON.stringify(user))
        localStorage.setItem("userId", user.id)
        localStorage.setItem("userName", user.name)
        localStorage.setItem("email", user.email)
        localStorage.setItem("type", user.type)
        localStorage.setItem("phone", user.phone)
        this.currentUserSubject.next(user)
    }

    logout(): void {
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userId")
        localStorage.removeItem("userName")
        localStorage.removeItem("email")
        localStorage.removeItem("type")
        localStorage.removeItem("phone")
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
        // En un escenario real, aquí retornarías el JWT token
        return localStorage.getItem("currentUser") ? "mock-token" : null
    }

    updateProfile(userData: Partial<User>): Observable<User> {
        const currentUser = this.getCurrentUser()
        if (!currentUser) throw new Error("No user logged in")

        return this.http
            .put<User>(`${this.apiUrl}/${currentUser.id}`, userData)
            .pipe(tap((updatedUser) => this.setCurrentUser(updatedUser)))
    }
}
