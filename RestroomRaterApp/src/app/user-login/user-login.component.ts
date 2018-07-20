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
  userName:String;
  loggedIn:boolean;

  constructor(private auth: UserAuthenticationService, private router: Router, private afAuth: AngularFireAuth, private repo: UserRepository) {
    this.user = auth.authInfo;
  }
  login() {

   this.auth.login();
   sessionStorage.setItem("loggedIn","true");
   this.loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));

    console.log('login');
  }
  logout() {
    this.auth.logout();
    sessionStorage.setItem("loggedIn","false");
   
    this.router.navigateByUrl("/");

    console.log('logout');
  }
  ngOnInit() {

    //Take user to homepage after succesfull login
    this.afAuth.authState.subscribe(user => {

      if (user) {
        console.log(user);
        // added by Ryan to check login when app is first loaded for navigation purposes
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem('userName',user.displayName);
    
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
    this.loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
    this.userName = sessionStorage.getItem('userName');
    // this.userName = sessionStorage.getItem("userName");
    this.updateUser();
  }







}
