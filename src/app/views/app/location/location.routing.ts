import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from "@angular/router";
import { LocationComponent } from "./location.component";
import { CountriesComponent } from "./countries/countries.component";

const routes: Routes = [{
  path: '', component: LocationComponent,
  children: [{
    path: 'countries', component: CountriesComponent
  }]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
}
