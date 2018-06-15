import { Component, OnInit } from '@angular/core';
import {Rating} from '../rating';
import {RatingService} from '../rating.service';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnInit {
  // rating = new Rating(1, 'Starbucks', false, 5, 4);

  constructor(public ratingService: RatingService) { }

  ngOnInit() { }

  onSubmit(rating) {
    this.ratingService.add(rating);
    console.log(rating);
  }

}
