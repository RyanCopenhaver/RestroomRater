import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { Router } from '../../../node_modules/@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user';
import { UserRepository } from '../user-service/user.repository';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user;
  currentUser: any;

  constructor(private auth: UserAuthenticationService, private router: Router, private afAuth: AngularFireAuth, private repo: UserRepository) {
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
        console.log(user);
    
        this.currentUser =  user;
        this.router.navigateByUrl("/home");
      }
    },      
    error => console.log("Error: ", error),
    () =>     console.log('subscribe done')
  
  )};

  updateUser() {
    console.log('updateUser',this.currentUser);
    //add userInfo to database
    this.repo.saveUser(this.currentUser);//new User(this.user.toJSON()['email'],this.user.toJSON()['displayName'],this.user.uid));
  }
  @ViewChild('logOutBtn') set logOutBtn (v : any) {
    console.log('logout viisble');
    this.updateUser();
  }







}
