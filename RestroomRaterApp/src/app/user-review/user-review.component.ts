// Component for displaying reviews submitted by current logged in user
import { Component, OnInit, ViewChild } from '@angular/core';
import { Review } from '../models/review';
import { ReviewRepository } from '../review-service/review.repository';
import { AgmMap } from '@agm/core';

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
    mapModalLat: number;
    mapModalLong: number;
    userCurrentLocationLat: number;
    userCurrentLocationLong: number;
    coordinates: any[];
    mapZoom: number;
    @ViewChild(AgmMap) public agmMap: AgmMap;

    // inject ReviewRepository
    constructor(public repository: ReviewRepository) { }

    // load Reviews into array on init
    ngOnInit() {
        this.testReviews = this.getReviews();
        // if array is undefined
        if (typeof this.testReviews === 'undefined') {
            console.log("The array is undefined!!!");
        }
        // else load userReviews with matching Reviews from testReviews
        else {
            console.log("Something there!");
            // filter Review objects based on returned value from checkUser()
            this.userReviews = this.testReviews.filter(
                review => this.checkUser(this.userId, review));
                this.mapLocation();
                this.agmMap.triggerResize();

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
    * checUser() tests to see if the
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

    mapLocation() {
        var reviews = this.userReviews;
        this.coordinates = [];
        this.mapZoom = 15;
         
        for (var i = 0; i < reviews.length; i++) {
            var estName = reviews[i].establishment.substring(0, reviews[i].establishment.indexOf(','));
              console.log(estName);
            this.coordinates.push({ lat: reviews[i].geoLocation.lat, lng: reviews[i].geoLocation.lng, location: estName });
        }

    }

} // END COMPONENT
