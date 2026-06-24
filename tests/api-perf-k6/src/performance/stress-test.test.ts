import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '15s', target: 500 },
        { duration: '30s', target: 1000 }, // Normal load
        { duration: '30s', target: 1500 }, // Pushing beyond normal
        { duration: '30s', target: 2000 }, // Stress breaking point
        { duration: '1m', target: 2000 },  // Hold at breaking point
        { duration: '30s', target: 0 },    // Recovery
    ],
};

export default function () {
    const payload = JSON.stringify({ userId: 'stress-user', pair: 'GBP/USD', action: 'SELL' });
    const params = { headers: { 'Content-Type': 'application/json' } };
    
    const res = http.post('https://httpbin.org/post', payload, params);
    
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}
