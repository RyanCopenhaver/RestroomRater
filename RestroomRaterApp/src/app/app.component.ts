import { Component } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  reviews: any[];

  constructor(db: AngularFireDatabase) {
    db.list('/Reviews').valueChanges().subscribe(reviews => {
      this.reviews = reviews;
      console.log(this.reviews);
    });
  }
}
