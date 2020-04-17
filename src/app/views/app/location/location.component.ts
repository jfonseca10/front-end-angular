import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  template: `
    <div class="row">
      <div class="col-12">
        <app-heading></app-heading>
        <app-breadcrumb></app-breadcrumb>
        <div class="separator mb-5"></div>
      </div>
    </div>
    <router-outlet></router-outlet>`
})

export class LocationComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
