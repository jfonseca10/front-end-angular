import {NgModule} from '@angular/core';
import {SedeRoutingModule} from "./sede.routing";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutContainersModule} from "../../../containers/layout/layout.containers.module";
import {SedeComponent} from './sede.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CollapseModule, RatingModule} from "ngx-bootstrap";
import { EditarSedeComponent } from './editar-sede/editar-sede.component';

@NgModule({
  imports: [SedeRoutingModule,
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    CollapseModule,
    RatingModule,
    ReactiveFormsModule],
  exports: [],
  declarations: [SedeComponent, EditarSedeComponent],
  providers: [],
})
export class SedeModule {
}
