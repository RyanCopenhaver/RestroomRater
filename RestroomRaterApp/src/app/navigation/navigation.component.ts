// Component for header and navigation area of app
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  // variable for accessing if user is already logged in
  loggedIn: boolean = JSON.parse(sessionStorage.getItem("loggedIn"));

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      //detect when route changes
      this.loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
    });
  }

  ngOnInit() {

  }

}
