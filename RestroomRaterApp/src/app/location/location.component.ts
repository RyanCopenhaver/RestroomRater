import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocationService} from '../location.service';
import {Location} from '../models/location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers:[ LocationService ]
})

export class LocationComponent implements OnInit {
  // inject ReviewService
  currentLocation: Location;

  constructor(private locationService: LocationService) {
    this.locationService.callLocationApi().subscribe(res => {this.currentLocation = new Location(res.location.lat, res.location.lng, res.accuracy)});
  }


  ngOnInit() {}
}


interface GmapsResponse {
  location: {
    lat: number,
    lng: number
  };
  accuracy: number;
}
