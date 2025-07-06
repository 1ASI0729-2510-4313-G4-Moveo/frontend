import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, Router } from "@angular/router"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatDividerModule } from "@angular/material/divider"
import { AuthService } from "../../../features/auth/auth.service"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule, MatDividerModule],
  template: `
    <div class="sidebar-overlay" [class.open]="isOpen" (click)="closeSidebar()"></div>
    <div class="sidebar" [class.open]="isOpen">
      <div class="sidebar-header">
        <div class="logo-section">
          <img src="/assets/moveo.png" alt="Moveo" />
          <span>MOVEO</span>
        </div>
        <button mat-icon-button (click)="closeSidebar()" class="close-btn">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="sidebar-content">
        <div class="user-info" *ngIf="currentUser">
          <div class="user-avatar">
            <img *ngIf="currentUser.avatar; else avatarPlaceholder" [src]="currentUser.avatar" alt="Avatar" />
            <ng-template #avatarPlaceholder>
              <mat-icon>person</mat-icon>
            </ng-template>
          </div>
          <div class="user-details">
            <h3>{{ currentUser.name }}</h3>
            <p>{{ currentUser.email }}</p>
            <span class="user-type">{{ currentUser.type === 'provider' ? 'Car Owner' : 'Renter' }}</span>
          </div>
        </div>

        <mat-divider></mat-divider>

        <nav class="sidebar-nav">
          <div class="nav-section">
            <h4>Main</h4>
            <a routerLink="/rent" (click)="closeSidebar()" class="nav-item">
              <mat-icon>directions_car</mat-icon>
              <span>Rent Cars</span>
            </a>
            <a routerLink="/record" (click)="closeSidebar()" class="nav-item">
              <mat-icon>history</mat-icon>
              <span>My Records</span>
            </a>
            <a routerLink="/payment" (click)="closeSidebar()" class="nav-item">
              <mat-icon>payment</mat-icon>
              <span>Payment Methods</span>
            </a>
          </div>

          <div class="nav-section" *ngIf="currentUser?.type === 'provider'">
            <h4>Provider</h4>
            <a routerLink="/provide" (click)="closeSidebar()" class="nav-item">
              <mat-icon>add_circle</mat-icon>
              <span>Add Car</span>
            </a>
            <a routerLink="/provide/your-cars" (click)="closeSidebar()" class="nav-item">
              <mat-icon>garage</mat-icon>
              <span>My Cars</span>
            </a>
            <a routerLink="/provider/profile" (click)="closeSidebar()" class="nav-item">
              <mat-icon>dashboard</mat-icon>
              <span>Provider Dashboard</span>
            </a>
          </div>

          <div class="nav-section">
            <h4>Account</h4>
            <a routerLink="/profile" (click)="closeSidebar()" class="nav-item">
              <mat-icon>person</mat-icon>
              <span>My Profile</span>
            </a>
            <a routerLink="/edit-profile" (click)="closeSidebar()" class="nav-item">
              <mat-icon>edit</mat-icon>
              <span>Edit Profile</span>
            </a>
            <a routerLink="/change-password" (click)="closeSidebar()" class="nav-item">
              <mat-icon>lock</mat-icon>
              <span>Change Password</span>
            </a>
          </div>

          <div class="nav-section">
            <h4>Support</h4>
            <button class="nav-item" (click)="showHelp()">
              <mat-icon>help</mat-icon>
              <span>Help & Support</span>
            </button>
            <button class="nav-item" (click)="showAbout()">
              <mat-icon>info</mat-icon>
              <span>About Moveo</span>
            </button>
          </div>
        </nav>

        <div class="sidebar-footer">
          <button mat-button color="warn" (click)="logout()" class="logout-btn">
            <mat-icon>logout</mat-icon>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .sidebar-overlay.open {
        opacity: 1;
        visibility: visible;
      }

      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 320px;
        height: 100vh;
        background: white;
        z-index: 999;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: linear-gradient(135deg, #00bfa6 0%, #00a693 100%);
        color: white;
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .logo-section img {
        height: 32px;
        width: auto;
      }

      .logo-section span {
        font-size: 1.5rem;
        font-weight: 700;
      }

      .close-btn {
        color: white;
      }

      .sidebar-content {
        flex: 1;
        overflow-y: auto;
        padding: 1.5rem 0;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0 1.5rem 1.5rem;
      }

      .user-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        background: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .user-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .user-avatar mat-icon {
        font-size: 2rem;
        color: #666;
      }

      .user-details h3 {
        margin: 0 0 0.25rem;
        font-size: 1.1rem;
        color: #333;
      }

      .user-details p {
        margin: 0 0 0.25rem;
        font-size: 0.9rem;
        color: #666;
      }

      .user-type {
        background: #00bfa6;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .sidebar-nav {
        flex: 1;
      }

      .nav-section {
        margin-bottom: 1.5rem;
      }

      .nav-section h4 {
        padding: 0 1.5rem;
        margin: 0 0 0.75rem;
        font-size: 0.85rem;
        font-weight: 600;
        color: #999;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1.5rem;
        color: #333;
        text-decoration: none;
        transition: all 0.3s ease;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
      }

      .nav-item:hover {
        background: #f0fdfc;
        color: #00bfa6;
        border-right: 3px solid #00bfa6;
      }

      .nav-item mat-icon {
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
      }

      .sidebar-footer {
        padding: 1.5rem;
        border-top: 1px solid #e0e0e0;
      }

      .logout-btn {
        width: 100%;
        justify-content: flex-start;
        gap: 1rem;
        padding: 0.75rem;
        color: #f44336;
      }

      .logout-btn:hover {
        background: #ffebee;
      }

      @media (max-width: 768px) {
        .sidebar {
          width: 280px;
        }
      }
    `,
  ],
})
export class SidebarComponent {
  @Input() isOpen = false
  @Output() closeEvent = new EventEmitter<void>()

  currentUser: any

  constructor(
      private authService: AuthService,
      private router: Router,
  ) {
    this.currentUser = this.authService.getCurrentUser()
  }

  closeSidebar(): void {
    this.closeEvent.emit()
  }

  logout(): void {
    this.authService.logout()
    this.closeSidebar()
  }

  showHelp(): void {
    // Implement help functionality
    this.closeSidebar()
  }

  showAbout(): void {
    // Implement about functionality
    this.closeSidebar()
  }
}
