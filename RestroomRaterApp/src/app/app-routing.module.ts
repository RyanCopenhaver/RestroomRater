import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { UserLoginComponent } from './user-login/user-login.component';
import {HomeComponent} from "./home/home.component";
import {ReviewSearchComponent} from "./review-search/review-search.component";
import {ReviewFormComponent} from "./review-form/review-form.component";

// Routes
const appRoutes: Routes = [
 {
     path: 'home', component: HomeComponent
 },
 {
     path: 'review', component: ReviewFormComponent
 },
 {
     path: 'search', component: ReviewSearchComponent,
 },
 {
     path: 'login', component: UserLoginComponent,
 },
 {
     path: '**', redirectTo: 'home'
 }
];

export const AppRouting = RouterModule.forRoot(appRoutes);