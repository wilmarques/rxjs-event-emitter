import { fromEvent } from 'https://cdn.skypack.dev/rxjs';
import { tap } from 'https://cdn.skypack.dev/rxjs/operators';

import { emit } from './emitter.js';

import './listener_one.js';
import './listener_two.js';

fromEvent(document, 'click')
  .pipe(
    tap(() => emit()),
  )
  .subscribe();
