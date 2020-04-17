import { NgModule } from '@angular/core';
import { LocationRoutingModule } from "./location.routing";
import { SharedModule } from "../../../shared/shared.module";
import { LayoutContainersModule } from "../../../containers/layout/layout.containers.module";
import { LocationComponent } from "./location.component";
import { CountriesComponent } from "./countries/countries.component";

@NgModule({
  imports: [LocationRoutingModule, SharedModule, LayoutContainersModule],
  exports: [],
  declarations: [LocationComponent, CountriesComponent],
  providers: [],
})
export class LocationModule {
}
