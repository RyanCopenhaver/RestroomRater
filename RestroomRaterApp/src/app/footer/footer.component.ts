// Footer component to display footer info and brand
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // get year of current date
  currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
