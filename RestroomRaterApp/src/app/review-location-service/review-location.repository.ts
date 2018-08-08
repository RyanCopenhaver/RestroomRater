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
    addLocation(review: Review) {
        // console.log(review);
        this.dataSource.database.ref("Locations").push({ Name: review.establishment,GeoLocation:review.geoLocation, AvgRating: review.rating, AvgCleanlinessRating:review.cleanlinessRating });

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
        var location = {};
        var found: boolean = false;
        //Loop through existing locatoins
        for (var i = 0; i < locArray.length; i++) {
            if (newReview.geoLocation == locArray[i].geoLocation) {
                location =  locArray[i];
                found = true;
                break;
            }
        }
        if (found) {
            this.updateLocationAggregateRatings(newReview,location,reviewArray);
        }
        //Add new Location to database if not found
        else {
            //updateLocations(review.Location) 
            this.addLocation(newReview);

        }
    }
    //Update aggregated ratings for location with new review data
    updateLocationAggregateRatings(newReview,location,reviewArray) {
        var ratingTotal= 0;
        var cRatingTotal = 0;
        var cTotal = 0;
        var total =  reviewArray.length;

        for(var i = 0; i < total; i++) {
            console.log(reviewArray[i].rating,reviewArray[i].location);

            if(reviewArray[i].location == newReview.location) {
                ratingTotal += reviewArray[i].rating;
                cRatingTotal += reviewArray[i].cleanlinessRating;


            }
      
        }
        var avgOverallRating = ((ratingTotal+newReview.rating)/(total+1));
        var avgOverallCRating = ((ratingTotal+newReview.cleanlinessRating)/(total+1));

        location.AvgRating = avgOverallRating.toFixed(2);
        location.AvgCleanlinessRating = avgOverallCRating.toFixed(2);
        this.updateLocation(location);
    }


}
