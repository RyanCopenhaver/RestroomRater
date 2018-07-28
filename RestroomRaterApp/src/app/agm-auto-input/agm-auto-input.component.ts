import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import { } from '../../../node_modules/@agm/core/services/google-maps-types';

@Component({
  selector: 'app-agm-auto-input',
  templateUrl: './agm-auto-input.component.html',
  styleUrls: ['./agm-auto-input.component.css']
})
export class AgmAutoInputComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;

  constructor(private mal: MapsAPILoader, private ngZone: NgZone) {

   }

  ngOnInit() {
    this.mal.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement,{types:['establishment']});
        autocomplete.addListener('place_changed',()=>{
          this.ngZone.run(()=> {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if(place.geometry === undefined || place.geometry ===null) {
              return;
            }
          })
        })
    
    }) 

  }

}
