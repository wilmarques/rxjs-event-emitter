//@ts-check

import { fromEvent, merge, interval, Subject, of } from 'https://cdn.skypack.dev/rxjs';
import { bufferTime, finalize, takeUntil, skipWhile, windowToggle, tap } from 'https://cdn.skypack.dev/rxjs/operators';

import { log } from './log.js';

const EVENTS = [
  fromEvent(document, 'click'),
  fromEvent(document, 'mousedown'),
  fromEvent(document, 'keypress'),
  fromEvent(document, 'DOMMouseScroll'),
  fromEvent(document, 'mousewheel'),
  fromEvent(document, 'touchmove'),
  fromEvent(window, 'mousemove'),
  fromEvent(window, 'resize'),
];

const maxInactivityInMs = 5000;
const inactivity$ = merge(...EVENTS)
  .pipe(
    bufferTime(maxInactivityInMs),
    skipWhile((events) => events.length > 0),
    tap(() => log('Emitting inactivity')),
    finalize(() => log('Finalizing inactivity')),
  );

const refresh = () => {
  log(`Refreshed`);
  restart();
  return of(true);
};

const restart$ = new Subject();
const restart = () => {
  log(`Restarted`);
  restart$.next();
};

const stop$ = new Subject();
const stop = () => stop$.next();

const initialize = () => {

  const refreshTimeInMs = 1000;
  log('Initialized');

  interval(refreshTimeInMs)
    .pipe(
      windowToggle(restart$, () => interval(refreshTimeInMs)),
      takeUntil(
        merge(
          inactivity$,
          stop$,
        )
      ),
      tap(() => refresh()),
      finalize(() => log('Finalized')),
    )
    .subscribe();
};

fromEvent(document.getElementsByTagName('button'), 'click')
  .pipe(
    tap((event) => {
      const methodName = event.target.id; // Same as button id
      const method = window['policy'][methodName];
      method();
    }),
  )
  .subscribe();

window['policy'] = {
  initialize,
  stop,
  restart,
  refresh,
};

window['streams'] = {
  inactivity$,
  stop$,
  restart$,
};
