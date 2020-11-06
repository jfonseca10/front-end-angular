import {NgModule} from '@angular/core';
import {EstudianteRoutingModule} from "./estudiante.routing";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutContainersModule} from "../../../containers/layout/layout.containers.module";
import {EstudianteComponent} from './estudiante.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CollapseModule, RatingModule} from "ngx-bootstrap";
import {EditarEstuadianteComponent} from './editar-estuadiante/editar-estuadiante.component';

@NgModule({
  imports: [EstudianteRoutingModule,
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    CollapseModule,
    RatingModule,
    ReactiveFormsModule],
  exports: [],
  declarations: [EstudianteComponent, EditarEstuadianteComponent],
  providers: [],
})
export class EstudianteModule {
}
