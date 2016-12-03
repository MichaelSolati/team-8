import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
declare var jQuery: any;

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  private googleApi: string = environment.google;
  private city: string = "";
  private citySub: Subscription;

  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    this.citySub = this.route.params.subscribe((params) => {
      this.city = params.city;
      console.log(this.city)
    });
  }

  ngOnDestroy() {
    this.citySub.unsubscribe();
  }

}
