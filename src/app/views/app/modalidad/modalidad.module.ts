import {NgModule} from '@angular/core';
import {ModalidadRoutingModule} from "./modalidad.routing";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutContainersModule} from "../../../containers/layout/layout.containers.module";
import {ModalidadComponent} from './modalidad.component';
import {FormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CollapseModule, RatingComponent} from "ngx-bootstrap";
import {EditarModalidadComponent} from "./editar-modalidad/editar-modalidad.component";

@NgModule({
  imports: [ModalidadRoutingModule,
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    CollapseModule],
  exports: [],
  declarations: [ModalidadComponent, EditarModalidadComponent],
  providers: [],
})
export class ModalidadModule {
}
