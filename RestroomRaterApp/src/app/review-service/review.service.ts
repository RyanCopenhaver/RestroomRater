import { Injectable } from '@angular/core';
import {Review} from '../models/review';
import {ReviewRepository} from "./review.repository";

@Injectable({
  providedIn: 'root'
})
// TODO: Possibly remove Service altogether
// TODO: As Repository does the job better
export class ReviewService {
  // array of reviews
  reviews: Review[] = [];

  // add() function adds a rating to the array
  add(review) {
    this.reviews.push(review);
  }

  getReviews() {

  }


  save(review) {
      this.repository.saveReview(review);
  }

  constructor(private repository: ReviewRepository) {
    this.reviews.concat(repository.getReviews());
  }
}
