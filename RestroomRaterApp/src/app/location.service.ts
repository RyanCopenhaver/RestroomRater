import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Place} from './models/place';
import {Location} from './models/location';
import {Keys} from './models/keys';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private gmapsPostUrl: string;
  private gPlacePostUrl: string;
  private geocodingUrl: string

  constructor(private http: HttpClient) {
    this.gmapsPostUrl = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + Keys.GMAPS_API_KEY;
    this.gPlacePostUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/xml?";
    this.geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=ADDRESS&key=" + Keys.GMAPS_API_KEY;
  }

  // TODO: add default values?
  callLocationApi() {
    return this.http.post<GmapsResponse>(this.gmapsPostUrl, null);
  };

  callPlacesApi(input: string, location: Location) {
    var currentPostUrl = this.gPlacePostUrl + "input=" + input + "&types=establishment";
    currentPostUrl += "&location=" + location.lat + "," + location.lng;
    currentPostUrl += "&radius=500&key=" + Keys.GMAPS_API_KEY;

    return this.http.post<GPlaceResponse>(currentPostUrl, null);
  };

  callLocationApiWithAddress(address: string){
    address = address.replace(new RegExp(' ', 'g'), '+');
    this.geocodingUrl = this.geocodingUrl.replace('ADDRESS', address);

    return this.http.get(this.geocodingUrl);
  }
}

interface GmapsResponse {
  location: {
    lat: number,
    lng: number
  };
  accuracy: number;
}

interface GPlaceResponse {
  html_attributions: string,
  results: Results[],
  status: string
}

interface Results {
  formatted_address: string,
  geometry: object,
  icon: string,
  id: string,
  name: string,
  opening_hours: object,
  photos: string[],
  place_id: string,
  plus_code: object,
  rating: number,
  reference: string,
  types: string[]
}
