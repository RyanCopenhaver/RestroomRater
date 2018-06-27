import { Component, OnInit } from '@angular/core';
import {Review} from '../models/review';
import {ReviewService} from '../review-service/review.service';

@Component({
  selector: 'app-review-search',
  templateUrl: './review-search.component.html',
  styleUrls: ['./review-search.component.css']
})
export class ReviewSearchComponent implements OnInit {

  searchChanging: boolean;
  searchCleanliness: number;
  searchOverall: number;

  constructor(public reviewService: ReviewService) { }

  ngOnInit() {
  }

  // TODO: Open ReviewService to look within reviews to display on screen
  onSubmit(form) {
    this.searchChanging = form.value.hasChangingTables;
    this.searchCleanliness = form.value.cleanlinessRating;
    this.searchOverall = form.value.rating;

    console.log('Submitted form. No data presented yet.');
    // reset form
    form.reset();
  }

}
