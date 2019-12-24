import { Component } from '@angular/core';
import * as Bluebird from 'bluebird';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  start() {
    const p = <Bluebird<void>> <any> this.test()
    p.then(() => {
      console.log('Promise then reached')
    }).catch((e: any) => {
      console.log('Promise error', e);
    }).finally(() => {
      console.log('Promise finally reached')
    });

    setTimeout(() => {
      if (typeof p.cancel !== 'function') {
        throw new Error('Not a bluebird promise -> can\'t cancel');
      }
      console.log('Trying to cancel...');
      p.cancel();
    }, 2500);
    console.log('Started');
  }

  private async test() {
    await new Bluebird((resolve, reject, onCancel) => {
      const timeout = setTimeout(() => {
        console.log('Timeout1!');
        resolve();
      }, 1000);
      onCancel(() => {
        console.log('Canceled1');
        clearTimeout(timeout);
      });
    });
    await new Bluebird((resolve, reject, onCancel) => {
      const timeout = setTimeout(() => {
        console.log('Timeout2!');
        resolve();
      }, 1000);
      onCancel(() => {
        console.log('Canceled2');
        clearTimeout(timeout);
      });
    });
    await this.third();
  }

  private async third() {
    await new Bluebird((resolve, reject, onCancel) => {
      const timeout = setTimeout(() => {
        console.log('Timeout3!');
        resolve();
      }, 1000);
      onCancel(() => {
        console.log('Canceled3');
        clearTimeout(timeout);
      });
    });
  }
}
