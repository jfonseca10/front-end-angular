import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../views/error/error.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    PerfectScrollbarModule
  ],
  exports: [
    PerfectScrollbarModule,
    RouterModule,
    ErrorComponent,
    TranslateModule,
    CommonModule,
    NgSelectModule,
    NgxDatatableModule
  ]
})
export class SharedModule {
}
