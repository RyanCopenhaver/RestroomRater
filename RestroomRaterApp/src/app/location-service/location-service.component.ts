import { Component, OnInit } from '@angular/core';
import {LocationService} from '../location.service';
import {Location} from '../models/rating';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {
  // inject RatingService
  constructor(public locationService: LocationService) { }

  // try to load location
  ngOnInit() { }

}
