
import { Promise as Bluebird } from 'bluebird';
import 'zone.js/dist/zone-bluebird';
declare var Zone: any;

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    // tslint:disable-next-line:no-string-literal
    Zone[Zone['__symbol__']('bluebird')](Bluebird);
    Bluebird.config({cancellation: true});
  })
  .catch(err => console.error(err));

