import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.css']
})
export class HomeMapComponent implements OnInit {
  private center: number[] = [-72.6506, 41.5623]
  private cities: any[] = [];

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.getCities().subscribe((cities) => {
      this.cities = cities;
      console.log(cities)
    }, (error) => {
      console.log(error);
    });
  }

  private extractData(res: Response) {
    let body = res.json();
    if (body.error) { throw body.error };
    return body.results || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.code);
  }

  private getCities(): Observable<any[]> {
    return this.http.get(environment.apiUrl + "cities").map(this.extractData).catch(this.handleError);
  }

  private getScore(safetyscore) {
    var globalmax = 15442;
    var globalmin = 1;
    return (safetyscore - globalmin) / (globalmax - globalmin);
  }

  private getColor(city) {
    console.log(city);
    var score = city.score;

    if (score <= 0 && score >= 0.2) {
      return "red";
    }
    else if (score <= 0.2 && score >= 0.4) {
      return "orange";
    }
    else if (score <= 0.4 && score >= 0.6) {
      return "yellow";
    }
    else if (score <= 0.6 && score >= 0.8) {
      return "green";
    }
    else {
      return "Chartreuse";
    }
  }

  private getWidth(city) {
    console.log(city)
    var score = city.score;

    return Math.round(score * 100);

  }

  private onResize(event) {
    //console.log(event.target.innerWidth);
  }
}
