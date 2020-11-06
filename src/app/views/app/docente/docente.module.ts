import {NgModule} from '@angular/core';
import {DocenteRoutingModule} from "./docente.routing";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutContainersModule} from "../../../containers/layout/layout.containers.module";
import {DocenteComponent} from './docente.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CollapseModule, RatingModule} from "ngx-bootstrap";
import { EditarDocenteComponent } from './editar-docente/editar-docente.component';

@NgModule({
  imports: [DocenteRoutingModule,
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    CollapseModule,
    RatingModule,
    ReactiveFormsModule],
  exports: [],
  declarations: [DocenteComponent, EditarDocenteComponent],
  providers: [],
})
export class DocenteModule {
}
