import { Injectable } from '@angular/core';
import {Review} from '../models/review';
import {ReviewRepository} from "./review.repository";

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  // array of reviews
  reviews: Review[] = [];

  // add() function adds a rating to the array
  add(review) {
    this.reviews.push(review);
  }

  save(review) {
      this.repository.saveReview(review);
  }

  constructor(private repository: ReviewRepository) { }
}
