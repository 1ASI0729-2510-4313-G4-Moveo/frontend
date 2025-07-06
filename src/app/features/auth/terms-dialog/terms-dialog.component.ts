import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatDialogRef } from "@angular/material/dialog"
import { MatDialogModule } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"

@Component({
  selector: "app-terms-dialog",
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="terms-dialog">
      <div class="dialog-header">
        <h2 mat-dialog-title>Terms and Conditions</h2>
        <button mat-icon-button (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div mat-dialog-content class="dialog-content" (scroll)="onScroll($event)">
        <div class="terms-content">
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using Moveo's car rental platform, you accept and agree to be bound by the terms and
            provision of this agreement.
          </p>

          <h3>2. Use License</h3>
          <p>
            Permission is granted to temporarily use Moveo's platform for personal, non-commercial transitory viewing
            only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display</li>
            <li>attempt to reverse engineer any software contained on the platform</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h3>3. Vehicle Rental Terms</h3>
          <p>
            All vehicle rentals are subject to availability and the terms set by individual car owners. Renters must:
          </p>
          <ul>
            <li>Possess a valid driver's license</li>
            <li>Be at least 21 years of age</li>
            <li>Provide valid identification and payment method</li>
            <li>Return the vehicle in the same condition as received</li>
          </ul>

          <h3>4. Insurance and Liability</h3>
          <p>
            Renters are responsible for any damage to the vehicle during the rental period. All rentals include basic
            insurance coverage, but additional coverage may be required for certain vehicles.
          </p>

          <h3>5. Payment Terms</h3>
          <p>
            Payment is processed securely through our platform. Rental fees are charged at the time of booking.
            Cancellation policies vary by vehicle owner.
          </p>

          <h3>6. Privacy Policy</h3>
          <p>
            Your privacy is important to us. We collect and use personal information only as described in our Privacy
            Policy, which is incorporated into these terms by reference.
          </p>

          <h3>7. Prohibited Uses</h3>
          <p>You may not use our platform:</p>
          <ul>
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
          </ul>

          <h3>8. Disclaimer</h3>
          <p>
            The information on this platform is provided on an 'as is' basis. To the fullest extent permitted by law,
            Moveo excludes all representations, warranties, conditions and terms.
          </p>

          <h3>9. Limitations</h3>
          <p>
            In no event shall Moveo or its suppliers be liable for any damages (including, without limitation, damages
            for loss of data or profit, or due to business interruption) arising out of the use or inability to use the
            platform.
          </p>

          <h3>10. Contact Information</h3>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
            <br />
            Email: legalmoveo.com
            <br />
            Phone: +51 1 234-5678
          </p>

          <div class="scroll-indicator" [class.visible]="!hasScrolledToBottom">
            <mat-icon>keyboard_arrow_down</mat-icon>
            <span>Please scroll to read all terms</span>
          </div>
        </div>
      </div>

      <div mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="close()">Cancel</button>
        <button mat-raised-button color="primary" [disabled]="!hasScrolledToBottom" (click)="accept()">
          I Accept Terms & Conditions
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .terms-dialog {
        max-width: 600px;
      }

      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #e0e0e0;
      }

      .dialog-header h2 {
        margin: 0;
        color: #00bfa6;
      }

      .dialog-content {
        max-height: 400px;
        overflow-y: auto;
        padding: 1.5rem;
        position: relative;
      }

      .terms-content h3 {
        color: #333;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
      }

      .terms-content p {
        line-height: 1.6;
        color: #666;
        margin-bottom: 1rem;
      }

      .terms-content ul {
        margin-left: 1rem;
        color: #666;
      }

      .terms-content li {
        margin-bottom: 0.5rem;
      }

      .scroll-indicator {
        position: sticky;
        bottom: 0;
        background: linear-gradient(transparent, white 50%);
        text-align: center;
        padding: 1rem;
        color: #00bfa6;
        font-size: 0.9rem;
        opacity: 1;
        transition: opacity 0.3s ease;
      }

      .scroll-indicator.visible {
        opacity: 1;
      }

      .scroll-indicator:not(.visible) {
        opacity: 0;
        pointer-events: none;
      }

      .scroll-indicator mat-icon {
        animation: bounce 2s infinite;
      }

      @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-10px);
        }
        60% {
          transform: translateY(-5px);
        }
      }

      .dialog-actions {
        padding: 1rem;
        border-top: 1px solid #e0e0e0;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }
    `,
  ],
})
export class TermsDialogComponent {
  hasScrolledToBottom = false

  constructor(private dialogRef: MatDialogRef<TermsDialogComponent>) {}

  onScroll(event: any): void {
    const element = event.target
    const threshold = 10 // pixels from bottom
    this.hasScrolledToBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - threshold
  }

  accept(): void {
    this.dialogRef.close("accepted")
  }

  close(): void {
    this.dialogRef.close()
  }
}
