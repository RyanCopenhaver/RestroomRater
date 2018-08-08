import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Router, CanActivate } from '@angular/router';
import { UserRepository } from '../user-service/user.repository';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  public authInfo: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private repo: UserRepository) {
    this.authInfo = this.afAuth.authState;

  }

  newUser: User;

  //log user in with google oauth
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((user) => {

        //store loggedIn user userName to database to use as Id
        sessionStorage.setItem('userName', user.additionalUserInfo.profile['name']);
        sessionStorage.setItem('userLoggedIn', 'true');

        if (user.additionalUserInfo.isNewUser) {
          sessionStorage.setItem('newUser', "true");
        }
        else {
          sessionStorage.setItem('newUser', "false");
        }

      }).catch(
        function (obj) {
        }
      );


  }
  isAuthenticated(): boolean {

    return JSON.parse(sessionStorage.getItem('userLoggedIn'));
  }



  //log user out with google
  logout() {
    sessionStorage.setItem('userLoggedIn', 'false');

    this.afAuth.auth.signOut().then(() => { console.log('logged out') });
  }
}
