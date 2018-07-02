import { Component, OnInit } from '@angular/core';
import {ReviewService} from '../review-service/review.service';
import {Review} from '../models/review';
import {ReviewRepository} from "../review-service/review.repository";

@Component({
  selector: 'app-rating-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
// TODO: Possibly remove ReviewService entirely from component
export class ReviewFormComponent implements OnInit {

  tempReview: Review;

  // inject ReviewService and ReviewRepository
  constructor(public repository: ReviewRepository) { }

  ngOnInit() { }

  getReviews(): Review[] {
    return this.repository.getReviews();
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
      timestamp
    )
    // add Review to Repository
    this.repository.saveReview(this.tempReview);
    // reset form
    form.reset();
  }

}
