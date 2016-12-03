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
      console.log(cities)
      this.cities = cities;
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
    return this.http.get(environment.apiUrl+"cities").map(this.extractData).catch(this.handleError);
  }

  private goToCity(city: string) {
    let cityURL: string = encodeURI(city + ", Connecticut");
    this.router.navigate(["/", "city", cityURL]);
  }

  private onResize(event) {
    console.log(event.target.innerWidth);
  }

}
