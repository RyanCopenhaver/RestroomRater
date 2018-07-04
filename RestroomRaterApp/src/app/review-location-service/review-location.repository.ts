import { Injectable } from "@angular/core";
//import { Observable } from "rxjs/Observable";
import { Location } from "../models/location";
import { AngularFireDatabase } from 'angularfire2/database';
import { Review } from "../models/review";
//Repo that has all CRUD operatoins for Restroom Ratings

@Injectable()
export class ReviewLocationRepository {
    private locations: any[] = [];
    private loaded: boolean = false;

    constructor(private dataSource: AngularFireDatabase) { }

    loadLocations() {
        this.loaded = true;
        this.dataSource.list('/Locations').valueChanges().subscribe(locations => {
            this.locations = locations;
            // console.log(this.locations);
        });
    }
    //Get Locations in Database
    getLocations(): Location[] {
        if (!this.loaded) {
            this.loadLocations();
        }
        return this.locations;
    }
    //Save location to firebase database
    addLocation(location: Review) {
        // console.log(review);
        this.dataSource.database.ref("Locations").push({ Name: location.location, AvgRating: location.rating });
        console.log('New location Added to DB!');

        //UpdateAggregateReviews
    }
    //delete location from firebase database
    deleteLocation(location: any): void {
        //  this.dataSource.object('/Locations/' + location.$key).remove();
        this.dataSource.database.ref("Locations").remove(location);

    }
    //update location from firebase database
    updateRating(location: any) {
        // this.dataSource.object('/Locations/' + location.$key).update(location);
        this.dataSource.database.ref("Locations").update(location);

    }

    //update location from firebase database
    updateLocation(location: any) {
        // this.dataSource.object('/Reviews/' + review.$key).update(review);
        this.dataSource.database.ref("Locations").update(location);

    }
    //Get reviews by specific user
    updateReviewLocations(newReview: Review, locArray,reviewArray) {
        var found: boolean = false;
        console.log('asdfasdfasdf', locArray);
        var location = {};
        //Loop through existing locatoins
        for (var i = 0; i < locArray.length; i++) {
            if (newReview.location == locArray[i].Name) {
                location =  locArray[i];
                found = true;
                break;
            }
        }
        if (found) {
            console.log('Existing location found!');
            this.updateLocationAggregateRatings(newReview,location,reviewArray);
        }
        //Add new Locaiton to database if not found
        else {
            //updateLocations(review.Location) 
            console.log('adding new location');
            this.addLocation(newReview);

        }
    }
    //Update aggregated ratings for location with new review data
    updateLocationAggregateRatings(newReview,location,reviewArray) {
        var ratingTotal= 0;
        var cTotal = 0;
        var total =  reviewArray.length;
        console.log('rArrr', reviewArray);

        for(var i = 0; i < total; i++) {
            console.log(reviewArray[i].rating,reviewArray[i].location);

            if(reviewArray[i].location == newReview.location) {
                ratingTotal += reviewArray[i].rating;
            }
      
        }
        var avg = ((ratingTotal+newReview.rating)/(total+1));
        location.AvgRating = avg.toFixed(2);
        console.log('avg',avg);
        this.updateLocation(location);
    }


}
