import { fromEvent } from 'https://cdn.skypack.dev/rxjs';
import { tap } from 'https://cdn.skypack.dev/rxjs/operators';

import { log } from './log.js';

const requestEvent = new CustomEvent('request', {
  detail: {
    data: 'indo',
    resolve: () => log('resolved'),
    reject: () => log('rejected'),
  },
});
fromEvent(document, 'click')
  .pipe(
    tap(() => window.dispatchEvent(requestEvent)),
  )
  .subscribe();

fromEvent(window, 'request')
  .pipe(
    tap(({ detail }) => {
      const { resolve, reject } = detail;
      resolve();
    }),
  )
  .subscribe();
