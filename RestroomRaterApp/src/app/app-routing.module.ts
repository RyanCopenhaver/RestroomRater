import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { UserLoginComponent } from './user-login/user-login.component';
import {HomeComponent} from "./home/home.component";
import {ReviewSearchComponent} from "./review-search/review-search.component";
import {ReviewFormComponent} from "./review-form/review-form.component";
import {UserReviewComponent} from "./user-review/user-review.component";
import { AuthGuard } from './auth-guard/auth-guard.component';

// Routes
const appRoutes: Routes = [
 {
     path: 'home', canActivate: [AuthGuard], component: HomeComponent
 },
 {
     path: 'review',canActivate: [AuthGuard], component: ReviewFormComponent
 },
 {
     path: 'search',canActivate: [AuthGuard], component: ReviewSearchComponent,
 },
 {
     path: 'login', component: UserLoginComponent,
 },
 {
     path: 'user-reviews',canActivate: [AuthGuard], component: UserReviewComponent,
 },
 {
     path: '**', redirectTo: 'login'
 }
];

export const AppRouting = RouterModule.forRoot(appRoutes);