import { Component, OnInit } from '@angular/core';
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

  updateLocationByAddress(address: string){
    this.locationService.callLocationApiWithAddress(address).subscribe(res => {
      console.log(res);
    this.currentLocation = new Location(res['results'][0].geometry.location.lat, res['results'][0].geometry.location.lng, 0);
    })
  }


  ngOnInit() {}
}
