import { Component, OnInit } from '@angular/core';
import { LocationService } from "../../../../shared/location.service";

@Component({
  selector: 'app-countries',
  templateUrl: 'countries.component.html',
  providers: [LocationService]
})

export class CountriesComponent implements OnInit {
  regions = [];
  countries = [];
  countriesColumns = [{name: 'Codigo', prop: 'id'}, {name: 'Pais', prop: 'countryName'}];
  loadingIndicator = false;


  constructor(private locationService: LocationService) {

  }

  ngOnInit() {
    this.locationService.getRegion().then(result => {
      this.regions = result;
    });
  }

  loadCountries(data) {
    const {regionID} = data
    this.loadingIndicator = true;
    this.locationService.getCountriesByRegion(regionID).then(result => {
      this.countries = result
      this.loadingIndicator = false
    }).catch(e => {
      console.log(e);
      this.loadingIndicator = false;
    })
  }
}
