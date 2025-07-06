import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { MatDialogRef } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"

export interface RatingDialogData {
  bookingId: string
  carModel: string
  carBrand: string
  carImage: string
  licensePlate: string
  currentRating?: number
  currentReview?: string
  providerName?: string
}

@Component({
  selector: "app-rating-dialog",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="rating-dialog">
      <div class="dialog-header">
        <h2 mat-dialog-title>Rate Your Experience</h2>
        <button mat-icon-button (click)="onCancel()" class="close-btn">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="car-info">
        <img [src]="data.carImage" [alt]="data.carBrand + ' ' + data.carModel" class="car-image">
        <div class="car-details">
          <h3>{{ data.carBrand }} {{ data.carModel }}</h3>
          <p class="license-plate">{{ data.licensePlate }}</p>
          <p class="provider-name" *ngIf="data.providerName">Provider: {{ data.providerName }}</p>
        </div>
      </div>

      <form [formGroup]="ratingForm" (ngSubmit)="onSubmit()">
        <div class="rating-section">
          <h3>How was your trip?</h3>
          <div class="stars-container">
            <mat-icon
                class="star"
                *ngFor="let star of [1, 2, 3, 4, 5]; let i = index"
                [class.filled]="i < selectedRating"
                [class.hover]="i < hoverRating"
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
              placeholder="Tell others about your experience with this vehicle..."
              maxlength="500"
          ></textarea>
          <mat-hint align="end">{{ (ratingForm.get('review')?.value || "").length }}/500</mat-hint>
        </mat-form-field>

        <div class="rating-tips">
          <h4>Rating Guidelines:</h4>
          <ul>
            <li><strong>5 stars:</strong> Excellent - Vehicle was perfect, clean, and as described</li>
            <li><strong>4 stars:</strong> Very Good - Minor issues but overall great experience</li>
            <li><strong>3 stars:</strong> Good - Average experience with some room for improvement</li>
            <li><strong>2 stars:</strong> Fair - Several issues that affected the experience</li>
            <li><strong>1 star:</strong> Poor - Major problems or disappointing experience</li>
          </ul>
        </div>

        <div mat-dialog-actions class="dialog-actions">
          <button type="button" mat-button (click)="onCancel()">Cancel</button>
          <button
              type="submit"
              mat-raised-button
              color="primary"
              [disabled]="selectedRating === 0"
              class="submit-btn"
          >
            <mat-icon>star</mat-icon>
            Submit Rating
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .rating-dialog {
        padding: 0;
        min-width: 500px;
        max-width: 600px;
      }

      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 1.5rem 1rem;
        border-bottom: 1px solid #e0e0e0;
      }

      .dialog-header h2 {
        margin: 0;
        color: #00bfa6;
        font-size: 1.5rem;
      }

      .close-btn {
        color: #666;
      }

      .car-info {
        display: flex;
        align-items: center;
        padding: 1.5rem;
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
      }

      .car-image {
        width: 80px;
        height: 60px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 1rem;
      }

      .car-details h3 {
        margin: 0 0 0.5rem;
        color: #333;
        font-size: 1.2rem;
      }

      .license-plate {
        color: #666;
        font-weight: 500;
        margin: 0 0 0.25rem;
      }

      .provider-name {
        color: #00bfa6;
        font-size: 0.9rem;
        margin: 0;
      }

      .rating-section {
        text-align: center;
        padding: 2rem 1.5rem 1rem;
      }

      .rating-section h3 {
        color: #333;
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
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

      .star.hover {
        color: #ffeb3b;
      }

      .rating-text {
        color: #666;
        font-size: 1.1rem;
        font-weight: 500;
        min-height: 1.5rem;
      }

      .review-field {
        width: 100%;
        margin: 0 1.5rem 1rem;
      }

      .rating-tips {
        padding: 0 1.5rem 1rem;
        background: #f8f9fa;
        margin: 1rem 0;
      }

      .rating-tips h4 {
        color: #333;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }

      .rating-tips ul {
        margin: 0;
        padding-left: 1rem;
      }

      .rating-tips li {
        font-size: 0.8rem;
        color: #666;
        margin-bottom: 0.25rem;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1rem 1.5rem 1.5rem;
        border-top: 1px solid #e0e0e0;
      }

      .submit-btn {
        background-color: #00bfa6 !important;
      }

      .submit-btn mat-icon {
        margin-right: 0.5rem;
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
      @Inject(MAT_DIALOG_DATA) public data: RatingDialogData,
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
        return "Poor - Major issues"
      case 2:
        return "Fair - Several problems"
      case 3:
        return "Good - Average experience"
      case 4:
        return "Very Good - Minor issues"
      case 5:
        return "Excellent - Perfect experience"
      default:
        return "Select a rating"
    }
  }

  onSubmit(): void {
    if (this.selectedRating > 0) {
      this.dialogRef.close({
        bookingId: this.data.bookingId,
        rating: this.selectedRating,
        review: this.ratingForm.value.review,
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
