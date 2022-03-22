import { fromEvent } from 'https://cdn.skypack.dev/rxjs';
import { tap } from 'https://cdn.skypack.dev/rxjs/operators';

import { log } from './log.js';

fromEvent(window, 'request')
  .pipe(
    tap(({ detail, target }) => {
      log(`Event dispatched on ${target}`);
      const { resolve } = detail;
      resolve('Listener 1');
    }),
  )
  .subscribe();
