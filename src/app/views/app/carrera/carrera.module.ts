import {NgModule} from '@angular/core';
import {CarreraRoutingModule} from "./carrera.routing";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutContainersModule} from "../../../containers/layout/layout.containers.module";
import {CarreraComponent} from './carrera.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CollapseModule, RatingModule} from "ngx-bootstrap";
import { EditarCarreraComponent } from './editar-carrera/editar-carrera.component';

@NgModule({
  imports: [CarreraRoutingModule,
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    CollapseModule,
    RatingModule,
    ReactiveFormsModule],
  exports: [],
  declarations: [CarreraComponent, EditarCarreraComponent],
  providers: [],
})
export class CarreraModule {
}
