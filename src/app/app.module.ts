import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from "./helpers";
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { LayoutContainersModule } from './containers/layout/layout.containers.module';
import { BsModalService, BsModalRef } from "ngx-bootstrap";

@NgModule({
  imports: [
    BrowserModule,
    ViewsModule,
    AppRoutingModule,
    LayoutContainersModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: BsModalService},
    {provide: BsModalRef}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
