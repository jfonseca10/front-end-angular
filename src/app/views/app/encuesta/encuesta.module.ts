import {NgModule} from '@angular/core';
import {EncuestaRoutingModule} from "./encuesta.routing";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutContainersModule} from "../../../containers/layout/layout.containers.module";
import {EncuestaComponent} from './encuesta.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CollapseModule, RatingModule} from "ngx-bootstrap";
import { EditarEncuestaComponent } from './editar-encuesta/editar-encuesta.component';

@NgModule({
  imports: [EncuestaRoutingModule,
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    CollapseModule,
    RatingModule,
    ReactiveFormsModule],
  exports: [],
  declarations: [EncuestaComponent, EditarEncuestaComponent],
  providers: [],
})
export class EncuestaModule {
}
