import { NgModule } from "@angular/core";
import { RegistroAsistenciaComponent } from "./registro-asistencia.component";
import { RegistroAsistenciaRoutingModule } from "./registro-asistencia.routing";
import { SharedModule } from "../../../shared/shared.module";
import { LayoutContainersModule } from "../../../containers/layout/layout.containers.module";
import { TabsModule } from "ngx-bootstrap/tabs"
import { SimpleNotificationsModule } from "angular2-notifications";
import { RegistroAsistenciasService } from "../../../shared/registro-asistencias.service";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [RegistroAsistenciaComponent],
  imports: [
    SharedModule,
    LayoutContainersModule,
    RegistroAsistenciaRoutingModule,
    TabsModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    FormsModule
  ],
  providers: [RegistroAsistenciasService, DatePipe]
})

export class RegistroAsistenciaModule {

}
