import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {CabDistributivoComponent} from "./cab-distributivo.component";

const routes: Routes = [{
  path: '',
  component: CabDistributivoComponent,
  children: [{
    path: '', component: CabDistributivoComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CabDistributivoRoutingModule {

}
