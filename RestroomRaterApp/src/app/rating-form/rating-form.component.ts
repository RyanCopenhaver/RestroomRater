import { Component, OnInit } from '@angular/core';
import {RatingService} from '../rating.service';
import {Rating} from '../rating';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})

export class RatingFormComponent implements OnInit {
  // inject RatingService
  constructor(public ratingService: RatingService) { }

  ngOnInit() { }

  /*
  onSubmit() adds value of form
  as a Rating object to the ratings array
  in RatingService
  */
  onSubmit(form) {
    // get timestamp for Rating object
    let timestamp = Date.now();
    // testing the data from the form
    console.log(form.value.location);
    console.log(form.value.overall);
    console.log(form.value.cleanliness);
    console.log(timestamp);
    // create new Rating with form values
    let rating = new Rating(
      form.value.location,
      form.value.changing,
      form.value.cleanliness,
      form.value.overall,
      timestamp
    )
    // add to array
    this.ratingService.add(rating);
    // reset form
    form.reset();
  }

}
