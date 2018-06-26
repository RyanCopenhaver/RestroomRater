import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocationService} from '../location.service';
import {Location} from '../models/location';
import {Keys} from '../models/keys';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {
  // inject ReviewService
  constructor(private http: HttpClient) {
    var locationService = new LocationService(http);
    this.currentLocation = locationService.updateLocation();
  }

  public currentLocation: Location = null;

  // try to load location
  ngOnInit() {

  }
}
