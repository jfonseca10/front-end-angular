import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {TipoTutoriaComponent} from "./tipo-tutoria.component";

const routes: Routes = [{
  path: '',
  component: TipoTutoriaComponent,
  children: [{
    path: '', component: TipoTutoriaComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TipoTutoriaRoutingModule {

}
