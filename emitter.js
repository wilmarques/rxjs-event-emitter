import { log } from './log.js';

const requestEvent = new CustomEvent('request', {
  detail: {
    data: 'request_data',
    resolve: (message) => log(`resolved ${message}`),
    reject: (message) => log(`rejected ${message}`),
  },
});

export const emit = () => {
  window.dispatchEvent(requestEvent);
};
