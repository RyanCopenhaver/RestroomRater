import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { UserLoginComponent } from './user-login/user-login.component';

// Routes
const appRoutes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: '/' },
 { path: '', component: UserLoginComponent }
];

export const AppRouting = RouterModule.forRoot(appRoutes);