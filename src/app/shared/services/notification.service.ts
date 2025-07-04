import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar"
import { BehaviorSubject } from "rxjs"

export interface Notification {
    id: string
    title: string
    message: string
    type: "info" | "success" | "warning" | "error"
    timestamp: Date
    read: boolean
}

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    private notificationsSubject = new BehaviorSubject<Notification[]>([])
    public notifications$ = this.notificationsSubject.asObservable()

    constructor(private snackBar: MatSnackBar) {
        this.loadNotifications()
    }

    private loadNotifications(): void {
        const stored = localStorage.getItem("notifications")
        if (stored) {
            this.notificationsSubject.next(JSON.parse(stored))
        }
    }

    private saveNotifications(): void {
        localStorage.setItem("notifications", JSON.stringify(this.notificationsSubject.value))
    }

    showSuccess(message: string): void {
        this.snackBar.open(message, "Close", {
            duration: 3000,
            panelClass: ["success-snackbar"],
        })
    }

    showError(message: string): void {
        this.snackBar.open(message, "Close", {
            duration: 5000,
            panelClass: ["error-snackbar"],
        })
    }

    showInfo(message: string): void {
        this.snackBar.open(message, "Close", {
            duration: 3000,
            panelClass: ["info-snackbar"],
        })
    }

    addNotification(notification: Omit<Notification, "id" | "timestamp" | "read">): void {
        const newNotification: Notification = {
            ...notification,
            id: Date.now().toString(),
            timestamp: new Date(),
            read: false,
        }

        const current = this.notificationsSubject.value
        this.notificationsSubject.next([newNotification, ...current])
        this.saveNotifications()
    }

    markAsRead(id: string): void {
        const notifications = this.notificationsSubject.value.map((n) => (n.id === id ? { ...n, read: true } : n))
        this.notificationsSubject.next(notifications)
        this.saveNotifications()
    }

    getUnreadCount(): number {
        return this.notificationsSubject.value.filter((n) => !n.read).length
    }
}
