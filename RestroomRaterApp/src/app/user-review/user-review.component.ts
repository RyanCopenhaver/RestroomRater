import { Component, OnInit } from '@angular/core';
import { Review } from '../models/review';
import { ReviewRepository } from '../review-service/review.repository';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  testReviews: Review[] = [];
  userReviews: Review[] = [];
  // inject ReviewRepository
  constructor(public repository: ReviewRepository) { }

    // load Reviews into array on init
    ngOnInit() {
        this.testReviews = this.getReviews();
        console.log("length: " + this.testReviews.length);
    }

    /*
    * getReviews() gets all Reviews
    * from the ReviewRepository and adds
    * them to the local array
    */
    getReviews(): Review[] {
        return this.repository.getReviews();
    }
    // TODO: filter out user reviews to display on html page.
    getUserReviews() {

    }

} // END COMPONENT
