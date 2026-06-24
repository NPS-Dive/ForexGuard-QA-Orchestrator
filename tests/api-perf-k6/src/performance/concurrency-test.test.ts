import http from 'k6/http';
import { check } from 'k6';

export let options = {
    scenarios: {
        constant_request_rate: {
            executor: 'constant-arrival-rate',
            rate: 200, // 200 requests per second
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 50,
            maxVUs: 1000,
        },
    },
};

export default function () {
    const payload = JSON.stringify({ userId: 'concurrent-user', pair: 'AUD/USD', action: 'SELL' });
    const params = { headers: { 'Content-Type': 'application/json' } };
    
    const res = http.post('https://httpbin.org/post', payload, params);
    
    check(res, { 'status is 200': (r) => r.status === 200 });
}
