import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {ReviewService} from '../review-service/review.service';
import {Review} from '../models/review';
import {ReviewRepository} from "../review-service/review.repository";
import { ReviewLocationRepository } from '../review-location-service/review-location.repository';
import {LocationComponent} from '../location/location.component';

@Component({
  selector: 'app-rating-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
// TODO: Possibly remove ReviewService entirely from component
export class ReviewFormComponent implements OnInit {

  tempReview: Review;
  private locations: any[] = [];
  private reviews: Review[] = [];

  @ViewChild(LocationComponent) locationComponent;

  //public reviewLocationRepo : ReviewLocationRepository;
  // inject ReviewService and ReviewRepository
  constructor(public repository: ReviewRepository,public reviewLocationRepo : ReviewLocationRepository) { }

  ngOnInit() {
    this.getLocations();
    this.getReviews();
  }

  /*
  * getReviews() loads the reviews
  * from the ReviewRepository into
  * a local array of Reviews
  * */
  getReviews(): Review[] {
    return this.repository.getReviews();
  }

  /*
  * getLocations() loads the locations
  * from the ReviewLocationRepository into
  * a local array of Locations
  * */
  getLocations(): any[] {
    return this.reviewLocationRepo.getLocations();
  }

  /*
  onSubmit() adds value of form
  as a Review object to the reviews array
  in ReviewService
  */
  onSubmit(form) {
    let hasChangingTables;
    // if hasChangingTables checkbox is not touched,
    // make value false, otherwise use value (true or false)
    if ((form.value.hasChangingTables == "") || (form.value.hasChangingTables == null)) {
      hasChangingTables = false;
    }
    else {
      hasChangingTables = form.value.hasChangingTables;
    }

    // get timestamp for Review object
    let timestamp = Date.now();

    // create new Review with form values
    this.tempReview = new Review(
      form.value.location,
      hasChangingTables,
      form.value.cleanlinessRating,
      form.value.rating,
      timestamp,
      this.locationComponent.currentLocation
    );

    // add Review to Repository
    this.repository.saveReview(this.tempReview);
    this.locations = this.getLocations();
    this.reviews = this.getReviews();
    this.reviewLocationRepo.updateReviewLocations(this.tempReview,this.locations,this.reviews);
    // reset form
    form.reset();
  }

}
