import { Injectable } from "@angular/core";
//import { Observable } from "rxjs/Observable";
import { Review } from "../models/review";
import { AngularFireDatabase } from 'angularfire2/database';
//Repo that has all CRUD operatoins for Restroom Ratings

@Injectable()
export class ReviewRepository {
    private reviews: any[];
    private loaded: boolean = false;

    constructor(private dataSource: AngularFireDatabase) { }

    loadReviews() {
        this.loaded = true;
        this.dataSource.list('/Reviews').valueChanges().subscribe(reviews => {
            this.reviews = reviews;
            // console.log(this.reviews);
        });
    }
    //Get Ratings in Database
    getReviews(): Review[] {
        if (!this.loaded) {
            this.loadReviews();
        }
        return this.reviews;
    }
    //Save review to firebase database
    saveReview(review: Review) {
         console.log(review);
        this.dataSource.database.ref("Reviews").push(review);
    }
    //delete review from firebase database
    deleteReview(review: any): void {
        //  this.dataSource.object('/Reviews/' + review.$key).remove();
        this.dataSource.database.ref("Reviews").remove(review);

    }
    //update review from firebase database
    updateReview(review: any) {
        // this.dataSource.object('/Reviews/' + review.$key).update(review);
        this.dataSource.database.ref("Reviews").update(review);

    }

   


}
