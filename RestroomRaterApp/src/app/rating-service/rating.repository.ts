import { Injectable } from "@angular/core";
//import { Observable } from "rxjs/Observable";
import { Rating } from "../models/rating";
import {AngularFireDatabase} from 'angularfire2/database';
//Repo that has all CRUD operatoins for Restroom Ratings

@Injectable()
export class RatingRepository {
    private reviews: any[];
    private loaded: boolean = false; 

    constructor(private dataSource: AngularFireDatabase) {}

    loadRatings() {            
        this.loaded = true;            
        this.dataSource.list('/Reviews').valueChanges().subscribe(reviews => {
            this.reviews = reviews;
            console.log(this.reviews);
          });     
    }
    //Get Ratings in Database     
    getRatings(): Rating[] {
        if (!this.loaded) {            
            this.loadRatings();            
        }            
        return this.reviews;
    }


    //Get ratings by specific user
    //getRatingsById(id: number) {}

    //Save review to firebase database
    saveRating(rating: Rating) {
        console.log(JSON.stringify(rating));
           //   this.dataSource.database.ref("Reviews").push(JSON.stringify(Rating));
    }
    
    UpdateRating(rating: Rating) {

    }

    
}