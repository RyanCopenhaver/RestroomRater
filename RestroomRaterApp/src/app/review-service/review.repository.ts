import { Injectable } from "@angular/core";
//import { Observable } from "rxjs/Observable";
import { Review } from "../models/review";
import {AngularFireDatabase} from 'angularfire2/database';
//Repo that has all CRUD operatoins for Restroom Ratings

@Injectable()
export class ReviewRepository {
    private reviews: any[];
    private loaded: boolean = false;

    constructor(private dataSource: AngularFireDatabase) {}

    loadReviews() {
        this.loaded = true;
        this.dataSource.list('/Reviews').valueChanges().subscribe(reviews => {
            this.reviews = reviews;
            console.log(this.reviews);
          });
    }
    //Get Ratings in Database
    getReviews(): Review[] {
        if (!this.loaded) {
            this.loadReviews();
        }
        return this.reviews;
    }


    //Get reviews by specific user
    //getRatingsById(id: number) {}

    //Save review to firebase database
    saveReview(review: Review) {
        console.log(JSON.stringify(review));
           //   this.dataSource.database.ref("Reviews").push(JSON.stringify(Review));
    }

    UpdateRating(rating: Review) {

    }


}
