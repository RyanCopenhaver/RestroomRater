import { Component, OnInit } from '@angular/core';
import { Review } from '../models/review';
import { ReviewRepository } from '../review-service/review.repository';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
// TODO: Document all of this!!!
export class UserReviewComponent implements OnInit {
  testReviews: Review[] = [];
  userReviews: Review[] = [];
  userId: string = sessionStorage.getItem('userId');

  // inject ReviewRepository
  constructor(public repository: ReviewRepository) { }

    // load Reviews into array on init
    ngOnInit() {
        // console.log("User ID: " + this.userId);
        this.testReviews = this.getReviews();

        if (typeof this.testReviews === 'undefined') {
            console.log("The array is undefined!!!");
        }
        else {
            console.log("Something there!");
            this.userReviews = this.testReviews.filter(
                review => this.checkUser(this.userId, review));
        }
    }

/*
* getReviews() gets all Reviews
* from the ReviewRepository and adds
* them to the local array
*/
    getReviews(): Review[] {
        return this.repository.getReviews();
    }

    // TODO: Document this
    checkUser(userId: string, testReview: Review): boolean {
      if ((typeof testReview.userId !== 'undefined') && (userId === testReview.userId)) {
        // console.log("TRUE");
        return true;
      }
      else {
        // console.log("FALSE");
        return false;
      }
    }

} // END COMPONENT
