import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {LocationService} from '../location.service';
import {LocationComponent} from '../location/location.component'
import {Location} from '../models/location';

@Component({
  selector: 'app-place-input',
  templateUrl: './place-input.component.html',
  styleUrls: ['./place-input.component.css'],
  providers:[ LocationService ]
})
export class PlaceInputComponent implements OnInit {

  @ViewChild(LocationComponent) locationComponent;

  constructor(private locationService: LocationService) { }

  // onchange this.locationComponent.currentLocation
  getCurrentLocation(): Location {
    return this.locationComponent.currentLocation
  }

  ngOnInit() {
  }

}
