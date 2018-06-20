import { Injectable } from '@angular/core';
import {Rating} from '../models/rating';
import {RatingRepository} from "./rating.repository";

@Injectable({
  providedIn: 'root'
})

export class RatingService {
  // array of ratings
  ratings: Rating[] = [];

  // add() function adds a rating to the array
  add(rating) {
    this.ratings.push(rating);
  }

  save(rating) {
      this.repository.saveRating(rating);
  }

  constructor(private repository: RatingRepository) { }
}
