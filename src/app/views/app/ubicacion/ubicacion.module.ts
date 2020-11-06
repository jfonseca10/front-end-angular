import {NgModule} from '@angular/core';
import {UbicacionRoutingModule} from "./ubicacion.routing";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutContainersModule} from "../../../containers/layout/layout.containers.module";
import {UbicacionComponent} from './ubicacion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CollapseModule, RatingModule} from "ngx-bootstrap";
import {editUbicacionComponent} from "./editUbicacion";

@NgModule({
  imports: [UbicacionRoutingModule,
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    CollapseModule,
    RatingModule,
    ReactiveFormsModule],
  exports: [],
  declarations: [UbicacionComponent, editUbicacionComponent],
  providers: [],
})
export class UbicacionModule {
}
