import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { AprobacionesComponent } from './aprobaciones.component';
import { LayoutContainersModule } from "../../../containers/layout/layout.containers.module";
import { AprobacionesRoutingModule } from "./aprobaciones.routing";
import { FormsModule } from "@angular/forms";
import { SimpleNotificationsModule } from "angular2-notifications";
import { TabsModule } from "ngx-bootstrap";
import { AprobacionesService } from "../../../shared/aprobaciones.service";
import { ActividadesService } from "../../../shared/actividades.service";
import { Angular2CsvModule } from "angular2-csv";

@NgModule({
  imports: [
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    AprobacionesRoutingModule,
    TabsModule.forRoot(),
    Angular2CsvModule

  ],
  declarations: [AprobacionesComponent],
  providers: [AprobacionesService, ActividadesService],
})
export class AprobacionesModule {
}
