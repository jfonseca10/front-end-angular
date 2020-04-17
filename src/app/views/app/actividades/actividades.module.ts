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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app.routing";


@NgModule({
  imports: [ActividadesRoutingModule, SharedModule, LayoutContainersModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    CommonModule],
  exports: [],
  declarations: [ActividadesComponent, CreateActividadesComponent],
  providers: []
})
export class ActividadesModule {
}
