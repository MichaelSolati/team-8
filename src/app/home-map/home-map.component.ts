import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.css']
})
export class HomeMapComponent implements OnInit {
  private center: number[] = [41.5623, -72.6506]
  private cities: any[] = [{
    'city': 'New Haven',
    'population': 200,
    'lat': 41.3083,
    'lng': -72.9279
  }];

  constructor() { }

  ngOnInit() {
  }

  onResize(event) {
    console.log(event.target.innerWidth);
  }

}
