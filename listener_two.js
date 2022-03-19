import { fromEvent } from 'https://cdn.skypack.dev/rxjs';
import { tap } from 'https://cdn.skypack.dev/rxjs/operators';

fromEvent(window, 'request')
  .pipe(
    tap(({ detail }) => {
      const { resolve } = detail;
      resolve('Listener 2');
    }),
  )
  .subscribe();