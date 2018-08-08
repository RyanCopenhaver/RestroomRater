import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {LocationService} from '../location.service';
import {LocationComponent} from '../location/location.component'
import {Location} from '../models/location';
import {Place} from '../models/place';

@Component({
  selector: 'app-place-input',
  templateUrl: './place-input.component.html',
  styleUrls: ['./place-input.component.css'],
  providers:[ LocationService ]
})
export class PlaceInputComponent implements OnInit {

  @ViewChild(LocationComponent) locationComponent;
  possiblePlaces: Place[];

  constructor(private locationService: LocationService) { }

  // onchange this.locationComponent.currentLocation
  getCurrentLocation(): Location {
    return this.locationComponent.currentLocation
  }

  updatePlaces(text){
    var currentLocation = this.getCurrentLocation();
    this.possiblePlaces = [];

    this.locationService.callPlacesApi(text, currentLocation).subscribe(
      res => {
        res.results.forEach(item => {
          this.possiblePlaces.push(new Place(item.id, item.name, item.formatted_address))
        })
      }
    );
  }

  ngOnInit() {
  }

}
