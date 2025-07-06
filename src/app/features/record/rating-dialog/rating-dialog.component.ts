import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { MatDialogRef } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: "app-rating-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div class="rating-dialog">
      <h2 mat-dialog-title>Rate Your Experience</h2>
      <p class="subtitle">{{ data.carModel }}</p>

      <form [formGroup]="ratingForm" (ngSubmit)="onSubmit()">
        <div class="rating-section">
          <h3>How was your trip?</h3>
          <div class="stars-container">
            <mat-icon
              class="star"
              *ngFor="let star of [1, 2, 3, 4, 5]; let i = index"
              [class.filled]="i < selectedRating"
              (click)="setRating(i + 1)"
              (mouseenter)="hoverRating = i + 1"
              (mouseleave)="hoverRating = 0"
            >
              {{ i < (hoverRating || selectedRating) ? "star" : "star_border" }}
            </mat-icon>
          </div>
          <p class="rating-text">{{ getRatingText() }}</p>
        </div>

        <mat-form-field appearance="outline" class="review-field">
          <mat-label>Share your experience (optional)</mat-label>
          <textarea
            matInput
            formControlName="review"
            rows="4"
            placeholder="Tell others about your experience..."
          ></textarea>
        </mat-form-field>

        <div mat-dialog-actions class="dialog-actions">
          <button type="button" mat-button (click)="onCancel()">Cancel</button>
          <button type="submit" mat-raised-button color="primary" [disabled]="selectedRating === 0">
            Submit Rating
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .rating-dialog {
        padding: 1rem;
        min-width: 400px;
      }

      .subtitle {
        color: #666;
        margin-bottom: 2rem;
        font-size: 1.1rem;
      }

      .rating-section {
        text-align: center;
        margin-bottom: 2rem;
      }

      .rating-section h3 {
        color: #333;
        margin-bottom: 1rem;
      }

      .stars-container {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .star {
        font-size: 2.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #ddd;
      }

      .star:hover {
        transform: scale(1.1);
      }

      .star.filled {
        color: #ffc107;
      }

      .rating-text {
        color: #666;
        font-size: 1.1rem;
        font-weight: 500;
      }

      .review-field {
        width: 100%;
        margin-bottom: 1rem;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;
      }
    `,
  ],
})
export class RatingDialogComponent {
  ratingForm: FormGroup
  selectedRating = 0
  hoverRating = 0

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<RatingDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.selectedRating = data.currentRating || 0
    this.ratingForm = this.fb.group({
      review: [data.currentReview || ""],
    })
  }
  setRating(rating: number): void {
    this.selectedRating = rating
  }

  getRatingText(): string {
    switch (this.hoverRating || this.selectedRating) {
      case 1:
        return "Poor"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Very Good"
      case 5:
        return "Excellent"
      default:
        return "Select a rating"
    }
  }

  onSubmit(): void {
    if (this.selectedRating > 0) {
      this.dialogRef.close({
        rating: this.selectedRating,
        review: this.ratingForm.value.review,
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
