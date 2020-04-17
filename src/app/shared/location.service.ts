import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

const {apiUrl} = environment;

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {
  }

  getRegion() {
    return this.http.get<any>(`${apiUrl}/region/regionList`).toPromise();
  }

  getCountriesByRegion(regionID) {
    return this.http.get<any>(`${apiUrl}/region/countriesByRegion`, {params: {regionID}}).toPromise();
  }

}
