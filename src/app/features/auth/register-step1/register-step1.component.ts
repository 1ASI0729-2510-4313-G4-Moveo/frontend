import { Component } from "@angular/core"
import { Router, RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"

@Component({
  selector: "app-register-step1",
  standalone: true,
  templateUrl: "./register-step1.component.html",
  styleUrls: ["./register-step1.component.css"],
  imports: [CommonModule, RouterLink, MatIconModule],
})
export class RegisterStep1Component {
  selectedRole: string | null = null

  constructor(private router: Router) {}

  selectRole(role: string): void {
    this.selectedRole = role
  }

  onSubmit(): void {
    if (this.selectedRole === "user") {
      this.router.navigate(["/register-step2"])
    } else if (this.selectedRole === "provider") {
      this.router.navigate(["/register-step3"])
    }
  }
}
