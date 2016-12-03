import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.css']
})
export class HomeMapComponent implements OnInit {
  private lat: number = 41.5623;
  private lng: number = -72.6506;
  constructor() { }

  ngOnInit() {
  }

}
