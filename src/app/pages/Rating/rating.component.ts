import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RatingService } from '../../core/services/rating.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  ratingForm: FormGroup;
  maxStars = 5;
  selectedStars = 0;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private ratingService: RatingService) {
    this.ratingForm = this.fb.group({
      comment: ['']
    });
  }

  selectStars(stars: number) {
    this.selectedStars = stars;
    this.errorMessage = '';
  }

  submitRating() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.selectedStars === 0) {
      this.errorMessage = 'Please select a rating!';
      return;
    }

    this.isLoading = true;

    this.ratingService.sendRating(this.selectedStars, this.ratingForm.value.comment).subscribe({
      next: (response) => {
        this.successMessage = response?.message ?? 'Thanks for your rating!';
        this.isLoading = false;
        this.ratingForm.reset();
        this.selectedStars = 0;
      },
      error: (error) => {
        this.errorMessage = error?.error?.message ?? 'Failed to submit rating!';
        this.isLoading = false;
      }
    });
  }
}