import { contacts } from './contacts.js';
import { coinflip } from './coinflip.js';

const baseUrl = 'https://test.k6.io';

export default function () {
  contacts(baseUrl);
  coinflip(baseUrl);
}

export const options = {
  scenarios: {
    breaking: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 20 },
        { duration: '50s', target: 20 },
        { duration: '50s', target: 60 },
        { duration: '50s', target: 100 },
        { duration: '50s', target: 140 },
        { duration: '50s', target: 180 },
      ],
    },
  },
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
    http_req_duration: ['p(99)<1000'],
  },
};
