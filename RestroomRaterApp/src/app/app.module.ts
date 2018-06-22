import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import { AppComponent } from './app.component';
import {environment} from './../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { ReviewFormComponent } from './review-form/review-form.component';
import { FormsModule } from '@angular/forms';
import { ReviewRepository} from './review-service/review.repository';
<<<<<<< HEAD

import { ReviewService} from './review-service/review.service';
// import { LocationComponent } from './location-service/location-service.component';
=======
import { HttpClientModule } from '@angular/common/http';

import { ReviewService} from './review-service/review.service';
import { LocationComponent } from './location-service/location-service.component';
>>>>>>> development

@NgModule({
  declarations: [
    AppComponent,
    ReviewFormComponent,
    // LocationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
<<<<<<< HEAD
    FormsModule
=======
    FormsModule,
    HttpClientModule
>>>>>>> development
  ],

    providers: [ReviewService, ReviewRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
