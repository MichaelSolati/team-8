import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  private googleApi: string = environment.google;
  private city: any = null;
  private cityId: string = "";
  private citySub: Subscription;
  private details: any = null;

  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    this.citySub = this.route.params.subscribe((params) => {
      this.cityId = params.cityId;
      this.getCity().subscribe((city) => {
        this.city = city.results[0];
        console.log(this.city);
        this.getDetails().subscribe((details) => {
          let details = JSON.parse(details).query.pages;
          for (let prop in details) {
            this.details = details[prop];
          }
        }, (error) => {
          console.log(error);
        });
      }, (error) => {
        console.log(error);
      });
    });
  }

  ngOnDestroy() {
    this.citySub.unsubscribe();
  }

  private extractData(res: Response) {
    let body = res.json();
    if (body.error) { throw body.error };
    return body || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.code);
  }

  private getCity(): Observable<any[]> {
    return this.http.get(environment.apiUrl + "cities/" + this.cityId).map(this.extractData).catch(this.handleError);
  }

  private getColor(rank) {
    var score = rank;

    if (score >= 0 && score <= 20) {
      return "red";
    }
    else if (score >= 21 && score <= 40) {
      return "orange";
    }
    else if (score >= 41 && score <= 60) {
      return "yellow";
    }
    else if (score >= 61 && score <= 80) {
      return "green";
    }
    else {
      return "lime";
    }
  }

  private getDetails(): Observable<any[]> {
    return this.http.get(environment.apiUrl + "details/" + encodeURI(this.city.jurisdictiongeo_city + ", Connecticut")).map(this.extractData).catch(this.handleError);
  }

}
