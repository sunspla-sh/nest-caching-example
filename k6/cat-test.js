//import necessary module

import http from 'k6/http';

export default function () {
  const url = 'http://localhost:3000/cats';
  const catPayload = JSON.stringify({
    name: 'jimbo',
    age: 2,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  console.log(res.body);
}
