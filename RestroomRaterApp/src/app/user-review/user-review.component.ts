// Component for displaying reviews submitted by current logged in user
import {Component, OnInit} from '@angular/core';
import {Review} from '../models/review';
import {ReviewRepository} from '../review-service/review.repository';

@Component({
    selector: 'app-user-review',
    templateUrl: './user-review.component.html',
    styleUrls: ['./user-review.component.css']
})

export class UserReviewComponent implements OnInit {
    // Review object arrays
    testReviews: Review[] = [];
    userReviews: Review[] = [];
    // get current user id from session storage
    userId: string = sessionStorage.getItem('userId');

    // inject ReviewRepository
    constructor(public repository: ReviewRepository) { }

    // load Reviews into array on init
    ngOnInit() {
        this.testReviews = this.getReviews();
        // if array is not undefined
        if (typeof this.testReviews !== 'undefined') {
            // filter Review objects based on returned value from checkUser()
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

    /*
    * checkUser() tests to see if the
    * userId in a Review object matches
    * the current user of the session
    */
    checkUser(userId: string, testReview: Review): boolean {
        // if the review has a userId property AND it matches the current user
        if ((typeof testReview.userId !== 'undefined') && (userId === testReview.userId)) {
            return true;
        }
        else {
            return false;
        }
    }

} // END COMPONENT
