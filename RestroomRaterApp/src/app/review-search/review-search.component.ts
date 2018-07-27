import { Component, OnInit } from '@angular/core';
import {Review} from '../models/review';
import {ReviewRepository} from "../review-service/review.repository";

@Component({
  selector: 'app-review-search',
  templateUrl: './review-search.component.html',
  styleUrls: ['./review-search.component.css']
})
export class ReviewSearchComponent implements OnInit {
  testReviews: Review[] = [];
  searchResults: Review[] = [];
  searchChanging: boolean;
  searchCleanliness: number;
  searchRating: number;

  // inject ReviewRepository
  constructor(public repository: ReviewRepository) { }


  // load Reviews into array on init
  ngOnInit() {
    this.testReviews = this.getReviews();
    // TODO: Testing filling array from repository on initial load
      if (typeof this.testReviews === 'undefined') {
          console.log("The array is undefined!!!");
      }
      else {
          console.log("Review-Search Reviews has something in it! ");
      }
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

    // reset form
    form.reset();
  }

}
