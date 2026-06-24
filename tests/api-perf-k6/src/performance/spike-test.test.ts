import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 100 },  // Baseline
        { duration: '10s', target: 1500 }, // Sudden Spike (e.g., major Forex news)
        { duration: '30s', target: 1500 }, // Hold spike
        { duration: '10s', target: 100 },  // Drop back to baseline
        { duration: '30s', target: 100 },  // Hold baseline
        { duration: '10s', target: 0 },
    ],
};

export default function () {
    const payload = JSON.stringify({ userId: 'spike-user', pair: 'USD/JPY', action: 'BUY' });
    const params = { headers: { 'Content-Type': 'application/json' } };
    
    const res = http.post('https://httpbin.org/post', payload, params);
    
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}
