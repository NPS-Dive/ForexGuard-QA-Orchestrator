import http from 'k6/http';
import { check, sleep } from 'k6';
import { Options } from 'k6/options';

export let options: Options = {
    vus: 1,
    iterations: 1,
};

// We will point this to your C# QA Control Center / Mock API later
const BASE_URL = 'https://httpbin.org'; 

export default function () {
    // 1. Simulate a Forex Trade payload
    const payload = JSON.stringify({
        userId: "user-789",
        pair: "EUR/USD",
        amount: 1500,
        action: "BUY"
    });

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    // 2. Send the trade request
    const res = http.post(`${BASE_URL}/post`, payload, params);

    // 3. Verify the response
    check(res, {
        'status is 200': (r) => r.status === 200,
        'trade executed for correct pair': (r) => {
            try {
                // httpbin returns the sent JSON inside a "json" property
                const body = r.json() as any;
                return body.json.pair === 'EUR/USD';
            } catch (e) {
                return false;
            }
        },
        'trade amount is correct': (r) => {
            try {
                const body = r.json() as any;
                return body.json.amount === 1500;
            } catch (e) {
                return false;
            }
        }
    });

    sleep(1);
}
