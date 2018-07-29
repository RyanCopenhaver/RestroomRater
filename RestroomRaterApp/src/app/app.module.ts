import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { ReviewFormComponent } from './review-form/review-form.component';
import { FormsModule } from '@angular/forms';
import { ReviewRepository} from './review-service/review.repository';

import { HttpClientModule } from '@angular/common/http';

import { ReviewService} from './review-service/review.service';
import { LocationComponent} from './location/location.component';
import { RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewSearchComponent } from './review-search/review-search.component';
import { ReviewLocationRepository } from './review-location-service/review-location.repository';
import { UserServiceComponent } from './user-service/user-service.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppRouting } from './app-routing.module';
import { UserAuthenticationService } from './services/user-authentication.service';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { UserRepository } from './user-service/user.repository';
import { NavigationComponent } from './navigation/navigation.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { PlaceInputComponent } from './place-input/place-input.component';
import { UserReviewComponent } from './user-review/user-review.component';
import {AgmCoreModule} from '@agm/core';
import { AgmAutoInputComponent } from './agm-auto-input/agm-auto-input.component';


@NgModule({
  declarations: [
    AppComponent,
    ReviewFormComponent,
    HomeComponent,
    LocationComponent,
    ReviewSearchComponent,
    UserServiceComponent,
    UserLoginComponent,
    AuthGuardComponent,
    NavigationComponent,
    FooterComponent,
    PlaceInputComponent,
    UserReviewComponent,
    AgmAutoInputComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
       apiKey:environment.googleMapsKey,
       libraries:['places']
    }),
    AppRouting,
    NgbModule.forRoot(),
  ],

    providers: [ReviewService, ReviewRepository,ReviewLocationRepository,UserRepository,UserAuthenticationService,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
