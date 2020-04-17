import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { CollapseModule } from "ngx-bootstrap";
import { PagesContainersModule } from "../../containers/pages/pages.containers.module";


@NgModule({
  declarations: [BlankPageComponent, AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    LayoutContainersModule,
    CollapseModule,
    PagesContainersModule
  ]
})
export class AppModule {
}

