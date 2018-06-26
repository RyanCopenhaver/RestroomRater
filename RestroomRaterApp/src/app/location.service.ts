import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from './models/location';
import {Keys} from './models/keys';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  constructor(private http: HttpClient) { }

  private gmapsPostUrl = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + Keys.GMAPS_API_KEY;

  // TODO: add default values?
  updateLocation(): Location {
    var currentLocation: Location = null;

    this.http.post<GmapsResponse>(this.gmapsPostUrl, null)
      .subscribe(
        res => currentLocation = new Location(res.location.lat, res.location.lng, res.accuracy),
        err => {
          console.log("Error occured");
        }
      );

      return currentLocation;
  };
}

interface GmapsResponse {
  location: {
    lat: number,
    lng: number
  };
  accuracy: number;
}
