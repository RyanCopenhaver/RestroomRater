import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Rating} from '../rating';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnInit {

  rating = new Rating(1, 'Starbucks', false, 5, 4);

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.rating);
  }

  // TODO: Remove this when done with testing
  get diagnostic() {
    return JSON.stringify(this.rating);
  }

}
