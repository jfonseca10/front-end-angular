import {NgModule} from '@angular/core';
import {CabDistributivoRoutingModule} from "./cab-distributivo.routing";
import {SharedModule} from "../../../shared/shared.module";
import {LayoutContainersModule} from "../../../containers/layout/layout.containers.module";
import {CabDistributivoComponent} from './cab-distributivo.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {CollapseModule, RatingModule} from "ngx-bootstrap";
import { EditarCabDistributivoComponent } from './editar-cab-distributivo/editar-cab-distributivo.component';

@NgModule({
  imports: [CabDistributivoRoutingModule,
    SharedModule,
    LayoutContainersModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    CollapseModule,
    RatingModule,
    ReactiveFormsModule],
  exports: [],
  declarations: [CabDistributivoComponent, EditarCabDistributivoComponent],
  providers: [],
})
export class CabDistributivoModule {
}
