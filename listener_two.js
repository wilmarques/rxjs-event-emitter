import { fromEvent, interval } from 'https://cdn.skypack.dev/rxjs';
import { take, tap } from 'https://cdn.skypack.dev/rxjs/operators';

import { log } from './log.js';

const subscription = fromEvent(window, 'request')
  .pipe(
    tap(({ detail }) => {
      const { resolve } = detail;
      resolve('Listener 2');
    }),
  )
  .subscribe();

interval(5000)
  .pipe(
    take(1),
    tap(() => subscription.unsubscribe()),
    tap(() => log('Listener 2 - Unsubscribed')),
  )
  .subscribe();
