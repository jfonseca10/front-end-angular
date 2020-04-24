import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AprobacionesComponent } from "./aprobaciones.component";

const routes: Routes = [
  {
    path: '', component: AprobacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AprobacionesRoutingModule {

}
