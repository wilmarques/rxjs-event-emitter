import { log } from './log.js';

const requestEvent = new CustomEvent('request', {
  bubbles: true,
  composed: true,
  detail: {
    data: 'request_data',
    resolve: (message) => log(`resolved ${message}`),
    reject: (message) => log(`rejected ${message}`),
  },
});

export const emit = () => {
  const testDiv = document.getElementById('test');
  testDiv.dispatchEvent(requestEvent);
}
