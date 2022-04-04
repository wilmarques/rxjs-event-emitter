//@ts-check

import { fromEvent, merge, interval } from 'https://cdn.skypack.dev/rxjs';
import { bufferTime, takeUntil, skipWhile, delay } from 'https://cdn.skypack.dev/rxjs/operators';

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

/**
 * @type number
 */
const refreshTimerInMs = 1000;

/**
 * @type number
 */
const maxInactivityInMs = 5000;

const inactivity$ = merge(...EVENTS)
  .pipe(
    bufferTime(maxInactivityInMs),
    skipWhile((events) => events.length > 0),
  );

/**
 * @param {number} policyCont
 */
const refresh = (policyCont) => {
  log(`Refreshed - Policy ${policyCont}`);
  initializeRefreshPolicy();
};
const stop = (policyCont) => log(`Stopped - Policy ${policyCont}`);

let cont = 0;
const initializeRefreshPolicy = () => {
  const policyCont = cont++;
  interval(refreshTimerInMs)
    .pipe(
      takeUntil(inactivity$),
    )
    .subscribe({
      next: () => refresh(policyCont),
      complete: () => stop(policyCont),
    });
};

initializeRefreshPolicy();
