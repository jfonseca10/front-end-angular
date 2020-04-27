import { NgModule } from '@angular/core';
import { ActividadesRoutingModule } from "./actividades.routing";
import { SharedModule } from "../../../shared/shared.module";
import { LayoutContainersModule } from "../../../containers/layout/layout.containers.module";
import { ActividadesComponent } from "./actividades.component";
import { CreateActividadesComponent } from "./create/create-actividades.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { TabsModule } from "ngx-bootstrap";
import { SimpleNotificationsModule } from "angular2-notifications";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { ComponentsStateButtonModule } from "../../../components/state-button/components.state-button.module";


@NgModule({
    imports: [ActividadesRoutingModule, SharedModule, LayoutContainersModule,
        ReactiveFormsModule,
        FormsModule,
        TabsModule.forRoot(),
        SimpleNotificationsModule.forRoot(),
        FormsModule,
        BsDatepickerModule.forRoot(),
        CommonModule,
        ModalModule.forRoot(), ComponentsStateButtonModule],
  exports: [],
  declarations: [ActividadesComponent, CreateActividadesComponent],
  providers: []
})
export class ActividadesModule {
}
