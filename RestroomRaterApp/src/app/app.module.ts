import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import { AppComponent } from './app.component';
import {environment} from './../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { RatingFormComponent } from './rating-form/rating-form.component';
import { FormsModule } from '@angular/forms';
import { RatingRepository} from '../app/rating-service/rating.repository';

import { RatingService} from '../app/rating-service/rating.service';

@NgModule({
  declarations: [
    AppComponent,
    RatingFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule
  ],
    
    providers: [RatingService,RatingRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
