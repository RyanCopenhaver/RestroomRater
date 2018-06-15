import { Injectable } from '@angular/core';
import {Rating} from './rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  // array of ratings
  ratings: Rating[] = [];

  // get() function
  get() {
    return this.ratings;
  }

  // add() function
  add(rating) {
    this.ratings.push(rating);
  }

  constructor() { }
}
