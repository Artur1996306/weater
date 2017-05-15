import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/observable/interval";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _city: string;
  private _weather: any;
  private _temp: number;
  private _serverWork: boolean;

  constructor(private http: Http) {
  }

  get serverWork(): boolean {
    return this._serverWork;
  }

  set serverWork(value: boolean) {
    this._serverWork = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;

  }

  get weather(): any {
    return this._weather;
  }

  set weather(value: any) {
    this._weather = value;
  }

  get temp(): number {
    return this._temp;
  }

  set temp(value: number) {
    this._temp = value;
  }

  public getSearchURL(city: string) {
    return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20" +
      "woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + city + "%22)%20and%20u%3D'c'&format=json&env=store%3A%2F%2F" +
      "datatables.org%2Falltableswithkeys";
  }

  public getTemperature(): void {
    console.log(this.getSearchURL(this.city));
    this.http.get(this.getSearchURL(this.city)).subscribe(response => {
      let res = JSON.parse((response as any)._body);
      if (res && res.query.results) {
        this.serverWork = true;
        this.temp = res.query.results.channel.item.condition.temp;

      } else {
        this.getTemperature()
        this.serverWork = false;
      }
    });
  }

}
