import { Component, OnInit } from '@angular/core';
import { ReviewRepository } from '../review-service/review.repository';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private repository: ReviewRepository) { }

  ngOnInit() {
  }

}
