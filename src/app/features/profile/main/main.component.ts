import { Component, type OnInit, ViewChild, type ElementRef } from "@angular/core"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatSnackBar } from "@angular/material/snack-bar"
import { HeaderBarComponent } from "../../../project/components/header-bar/header-bar.component"
import { AuthService } from "../../auth/auth.service"

@Component({
  selector: "app-main",
  imports: [CommonModule, HeaderBarComponent, MatIconModule, MatButtonModule],
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
  standalone: true
})
export class MainComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef

  userName = ""
  userEmail = ""
  userPhone = ""
  userDni = ""
  userAvatar = ""
  currentLanguage = "English"
  notificationsEnabled = true

  userStats = {
    hoursTraveled: 13.5,
    tripsTaken: 4,
    amountSpent: 44.8,
    lastRide: "05/03/2025",
  }

  constructor(
      private router: Router,
      private authService: AuthService,
      private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadUserData()
  }

  private loadUserData(): void {
    const currentUser = this.authService.getCurrentUser()
    if (currentUser) {
      this.userName = currentUser.name
      this.userEmail = currentUser.email
      this.userPhone = currentUser.phone
      this.userDni = (currentUser as any).dni || ""
      this.userAvatar = currentUser.avatar || ""
    }

    // Load additional data from localStorage if available
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      const profile = JSON.parse(storedProfile)
      this.userName = profile.fullName || this.userName
      this.userEmail = profile.email || this.userEmail
      this.userPhone = profile.phone || this.userPhone
      this.userDni = profile.dni || this.userDni
    }
  }

  goToEditProfile(): void {
    this.router.navigate(["/edit-profile"])
  }

  goToChangePassword(): void {
    this.router.navigate(["/change-password"])
  }

  goToPayment(): void {
    this.router.navigate(["/payment"])
  }

  uploadPhoto(): void {
    this.fileInput.nativeElement.click()
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.userAvatar = e.target?.result as string
        // Save to localStorage
        const currentUser = this.authService.getCurrentUser()
        if (currentUser) {
          const updatedUser = { ...currentUser, avatar: this.userAvatar }
          localStorage.setItem("currentUser", JSON.stringify(updatedUser))
        }
        this.snackBar.open("Profile photo updated successfully!", "Close", {
          duration: 3000,
          panelClass: ["success-snackbar"],
        })
      }
      reader.readAsDataURL(file)
    }
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === "English" ? "Español" : "English"
    this.snackBar.open(`Language changed to ${this.currentLanguage}`, "Close", {
      duration: 2000,
      panelClass: ["info-snackbar"],
    })
  }

  toggleNotifications(): void {
    this.notificationsEnabled = !this.notificationsEnabled
    this.snackBar.open(`Notifications ${this.notificationsEnabled ? "enabled" : "disabled"}`, "Close", {
      duration: 2000,
      panelClass: ["info-snackbar"],
    })
  }

  logout(): void {
    this.authService.logout()
  }
}
