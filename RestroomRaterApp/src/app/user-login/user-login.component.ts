import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { Router } from '../../../node_modules/@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user;

  constructor(private auth: UserAuthenticationService, private router: Router, private afAuth: AngularFireAuth) {
    this.user = auth.authInfo;
  }
  login() {

   this.auth.login();
    console.log('login');
  }
  logout() {
    this.auth.logout();

    this.router.navigateByUrl("/");

    console.log('logout');
  }
  ngOnInit() {

    //Take user to homepage after succesfull login
    this.afAuth.authState.subscribe(user => {

      if (user) {
        this.router.navigateByUrl("/home");
      }
    });
  }





}
