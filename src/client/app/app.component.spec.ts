import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import {
  async
} from '@angular/core/testing';
import {
  Route
} from '@angular/router';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ModelService } from './shared/index';
import { ApiService } from './shared/index';
import { DataParcerService } from './shared/index';

export function main() {

  describe('App component', () => {

    let config: Route[] = [
      { path: '', component: StatsComponent }
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, RouterTestingModule.withRoutes(config)],
        declarations: [TestComponent,
          NavbarComponent, AppComponent,
          StatsComponent],
        providers: [
          ModelService,ApiService,DataParcerService,
          MockBackend,
          BaseRequestOptions,
          { provide: APP_BASE_HREF, useValue: '/' },
          {
            provide: Http,
            useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      });
    });

  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app></sd-app>'
})

class TestComponent {
}
