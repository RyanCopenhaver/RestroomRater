import { Component, OnInit } from '@angular/core';
import {Review} from '../models/review';
import {ReviewService} from '../review-service/review.service';
import {ReviewRepository} from "../review-service/review.repository";

@Component({
  selector: 'app-review-search',
  templateUrl: './review-search.component.html',
  styleUrls: ['./review-search.component.css']
})
export class ReviewSearchComponent implements OnInit {
  searchResults: any[];
  searchChanging: boolean;
  searchCleanliness: number;
  searchRating: number;

  constructor(public reviewService: ReviewService, public repository: ReviewRepository) { }

  ngOnInit() {
  }

  checkReview(hasChangingTables, cleanlinessRating, rating, testReview): boolean {
    // if changing tables is checked, or both reviews are checked
    if (hasChangingTables == false ||
      (hasChangingTables == true && testReview.hasChangingTables == true)) {
      // searchReview cleanliness is less than testReview
      if (cleanlinessRating <= testReview.cleanlinessRating) {
        // searchReview overall rating is less than testReview
        if (rating <= testReview.rating) {
          return true;
        }
      }
    }
    // otherwise doesn't meet search criteria
    return false;
  }

  onSubmit(form) {
    this.searchChanging = form.value.hasChangingTables;
    this.searchCleanliness = form.value.cleanlinessRating;
    this.searchRating = form.value.rating;

    // TODO: fix error when pushing to searchResults array
    for(let review of this.repository.getReviews()) {

      if (this.checkReview(this.searchChanging,this.searchCleanliness,this.searchRating, review)) {
        // this.searchResults.push(review);
        console.log('Pushed to searchResults: ');
        console.log(review);
      }
      else {
        console.log('Not Pushed: ');
        console.log(review);
      }

    }


    // reset form
    form.reset();
  }

}
