import { Injectable } from '@angular/core';
import {Location} from './models/location';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  // TODO: add default values?
  location: Location = {};

  // updates user's location
  updateLocation(newLocation) {
    this.location = newLocation;
  }

  constructor() { }
}
