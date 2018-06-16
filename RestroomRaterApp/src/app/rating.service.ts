import { Injectable } from '@angular/core';
import {Rating} from './rating';

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

  constructor() { }
}
