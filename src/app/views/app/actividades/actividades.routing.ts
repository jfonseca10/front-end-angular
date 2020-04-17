import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from "@angular/router";
import { ActividadesComponent } from "./actividades.component";
import { CreateActividadesComponent } from "./create/create-actividades.component";

const routes: Routes = [{
  path: '', component: ActividadesComponent,
  children: [{
    path: 'create', component: CreateActividadesComponent
  }]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesRoutingModule {
}
