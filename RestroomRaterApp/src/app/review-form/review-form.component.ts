import { Component, OnInit } from '@angular/core';
import {ReviewService} from '../review-service/review.service';
import {Review} from '../models/review';

@Component({
  selector: 'app-rating-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})

export class ReviewFormComponent implements OnInit {
  // inject ReviewService
  constructor(public reviewService: ReviewService) { }

  ngOnInit() { }

  /*
  onSubmit() adds value of form
  as a Review object to the reviews array
  in ReviewService
  */
  onSubmit(form) {
    // get timestamp for Review object
    let timestamp = Date.now();
    // testing the data from the form
    console.log(form.value.location);
    console.log(form.value.rating);
    console.log(form.value.cleanlinessRating);
    console.log(timestamp);
    // create new Review with form values
    let review = new Review(
      form.value.location,
      form.value.hasChangingTables,
      form.value.cleanlinessRating,
      form.value.rating,
      timestamp
    )
    // add to array
    this.reviewService.add(review);
    this.reviewService.save(review);
    // reset form
    form.reset();
  }

}
