import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '../../../node_modules/@angular/router';
import { UserRepository } from '../user-service/user.repository';
import { User } from '../models/user';
import { _getComponentHostLElementNode } from '../../../node_modules/@angular/core/src/render3/instructions';

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

        //store loggedIn user email to database to use as Id
        sessionStorage.setItem('userEmail',user.email);
        if (user.additionalUserInfo.isNewUser) {
            sessionStorage.setItem('newUser',"true");
        }
        else {
          sessionStorage.setItem('newUser',"false");
        }

      }).catch(
        function (obj) {
          console.log(obj);
        }
      );


  }


  //log user out with google
  logout() {
    this.afAuth.auth.signOut().then(() => { console.log('logged out') });
  }
}
