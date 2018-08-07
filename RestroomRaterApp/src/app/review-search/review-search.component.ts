// Component for viewing submitted reviews
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Review } from '../models/review';
import { Location } from '../models/location';
import { ReviewRepository } from "../review-service/review.repository";
import { LocationComponent } from '../location/location.component'
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-review-search',
  templateUrl: './review-search.component.html',
  styleUrls: ['./review-search.component.css']
})

export class ReviewSearchComponent implements OnInit {

  @ViewChild(LocationComponent) locationComponent;
  testReviews: Review[] = [];
  searchResults: Review[] = [];
  resultsByDistance: DistanceFromUser[] = [];
  searchChanging: boolean;
  searchCleanliness: number;
  searchRating: number;
  mapModalLat: number;
  mapModalLong: number;
  userCurrentLocationLat: number;
  userCurrentLocationLong: number;
  coordinates: any[];
  mapZoom: number;
  strokeColor: string;

  @ViewChild(AgmMap) public agmMap: AgmMap;


  // inject ReviewRepository
  constructor(public repository: ReviewRepository) { }

  // load Reviews into array on init
  ngOnInit() {
    this.testReviews = this.getReviews();
    this.agmMap.triggerResize();

  }

  /*
  * getReviews() gets all Reviews
  * from the ReviewRepository and adds
  * them to the local array
  * */
  getReviews(): Review[] {
    return this.repository.getReviews();
  }

  /*
  * checkReview()
  * compares user input with
  * review values from database
  * */
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


  // Uses the haversine formula to calculate the distance from the users current location to the location of the review
  calculateDistanceFromUser(reviews: Review[]): DistanceFromUser[] {
    // get user's current location
    let currentLocation = this.locationComponent.currentLocation;
    let userLat = currentLocation.lat;
    let userLng = currentLocation.lng;
    const earthRadius = 6371e3; // metres
    let distances: DistanceFromUser[] = [];

    for (let review of reviews) {
      if (review.geoLocation.lat && review.geoLocation.lng) {
        let reviewLat = review.geoLocation.lat;
        let reviewLng = review.geoLocation.lng;

        // haversine formula
        let φ1 = this.toRadians(userLat);
        let φ2 = this.toRadians(reviewLat);
        let Δφ = this.toRadians(reviewLat - userLat);
        let Δλ = this.toRadians(reviewLng - userLng);

        let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let distInM = earthRadius * c;
        let distInKM = Math.round(distInM / 100) / 10;

        distances.push({ review: review, distance: distInKM });
      } else {
        distances.push({ review: review });
      }
    }

    // sort by distance
    distances.sort(function (a, b) { return a.distance - b.distance });

    return distances;
  }

  //display google map with markers showing the users current location and the location of the clicked review
  mapLocation(rev) {
    this.coordinates = [];
    this.userCurrentLocationLat = this.locationComponent.currentLocation.lat;
    this.userCurrentLocationLong = this.locationComponent.currentLocation.lng;
    this.mapZoom = 15;
    //this.resultsByDistance.distance
    this.mapModalLat = rev.review.geoLocation.lat;
    this.mapModalLong = rev.review.geoLocation.lng;
    var estName = rev.review.establishment.substring(0, rev.review.establishment.indexOf(','));
    this.coordinates.push({ lat: this.mapModalLat, lng: this.mapModalLong, location: estName });
    this.coordinates.push({ lat: this.userCurrentLocationLat, lng: this.userCurrentLocationLong, location: 'You are Here' });
    this.strokeColor = '#1995ad';



    console.log(this.mapModalLat, this.mapModalLong);
  }
  onChoseLocation(event) {

  }
  labelOptions = { color: '#1995ad' }
  toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  /*
  * onSubmit()
  * gets user input values
  * and compares them to all review objects
  * in the repository. When matches are found
  * they are pushed to the searchResults array
  * */
  onSubmit(form) {
    // if hasChangingTables checkbox is not touched,
    // make value false, otherwise use value (true or false)
    if ((form.value.hasChangingTables == '') || (form.value.hasChangingTables == null)) {
      this.searchChanging = false;
    }
    else {
      this.searchChanging = form.value.hasChangingTables;
    }

    this.searchCleanliness = form.value.cleanlinessRating;
    this.searchRating = form.value.rating;

    // filter values from repository to searchResults[]
    // that return true from checkReview()
    this.searchResults = this.repository.getReviews().filter(
      review => this.checkReview(this.searchChanging,
        this.searchCleanliness, this.searchRating, review));

    this.resultsByDistance = this.calculateDistanceFromUser(this.searchResults);

    // reset form
    form.reset();
  }

}

interface DistanceFromUser {
  review: Review;
  distance?: number;
}
