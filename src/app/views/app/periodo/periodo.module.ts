import {NgModule} from '@angular/core';
import {PeriodoRoutingModule} from "./periodo.routing";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutContainersModule} from "../../../containers/layout/layout.containers.module";
import {PeriodoComponent} from './periodo.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CollapseModule, RatingModule} from "ngx-bootstrap";
import { EditarPeriodoComponent } from './editar-periodo/editar-periodo.component';

@NgModule({
  imports: [PeriodoRoutingModule,
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    CollapseModule,
    RatingModule,
    ReactiveFormsModule],
  exports: [],
  declarations: [PeriodoComponent, EditarPeriodoComponent],
  providers: [],
})
export class PeriodoModule {
}
