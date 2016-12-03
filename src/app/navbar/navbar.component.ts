import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private showDrop: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  private toggleNav() {
    this.showDrop = !this.showDrop;
  }
}
