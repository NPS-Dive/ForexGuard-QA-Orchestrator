import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '15s', target: 500 },  // Ramp up to 500 VUs
        { duration: '30s', target: 1000 }, // Ramp up to 1000 VUs
        { duration: '1m', target: 1000 },  // Hold at normal peak load
        { duration: '30s', target: 0 },    // Ramp down to 0
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    },
};

export default function () {
    const payload = JSON.stringify({ userId: 'load-user', pair: 'EUR/USD', action: 'BUY' });
    const params = { headers: { 'Content-Type': 'application/json' } };
    
    const res = http.post('https://httpbin.org/post', payload, params);
    
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}
 