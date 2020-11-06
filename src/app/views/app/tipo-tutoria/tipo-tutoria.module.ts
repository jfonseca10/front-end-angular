import {NgModule} from '@angular/core';
import {TipoTutoriaRoutingModule} from "./tipo-tutoria.routing";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutContainersModule} from "../../../containers/layout/layout.containers.module";
import {TipoTutoriaComponent} from './tipo-tutoria.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CollapseModule, RatingModule} from "ngx-bootstrap";
import { EditarTipoTutoriaComponent } from './editar-tipo-tutoria/editar-tipo-tutoria.component';

@NgModule({
  imports: [TipoTutoriaRoutingModule,
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    CollapseModule,
    RatingModule,
    ReactiveFormsModule],
  exports: [],
  declarations: [TipoTutoriaComponent, EditarTipoTutoriaComponent],
  providers: [],
})
export class TipoTutoriaModule {
}
