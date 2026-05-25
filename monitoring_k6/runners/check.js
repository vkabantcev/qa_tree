/*
|--------------------------------------------------------------------------
| Check Runner
|--------------------------------------------------------------------------
|
| Entry point for interval-based monitoring scenarios.
|
| Responsible for:
| - scenario execution
| - periodic API validation
| - threshold configuration
| - metrics summary reporting
|
*/

import { yourApi1 }
    from '../scenarios/your_dir_1/your_api_1.js';

import { yourApi2 }
    from '../scenarios/your_dir_2/your_api_2.js';

// Services included in summary output

const SERVICES = [
    'your_api_1',
    'your_api_2',
];

export const options = {

    // Global thresholds applied to all scenarios

    thresholds: {

        http_req_failed: [
            'rate<0.05',
        ],

        http_req_duration: [
            'p(95)<2000',
            'avg<1000',
        ],
    },

    scenarios: {

        // Active monitoring scenario

        check: {

            executor: 'constant-arrival-rate',

            // Exported scenario executor name

            exec: 'yourApi1Scenario',

            // Requests per period

            rate: 1,

            // Time interval for request rate

            timeUnit: '20s',

            // Total scenario duration

            duration: '5m',

            // Minimum allocated virtual users

            preAllocatedVUs: 1,

            // Maximum virtual users allowed

            maxVUs: 5,
        },
    },
};

// Scenario executor for selected monitoring check

export function yourApi1Scenario() {
    yourApi1();
}

// Additional scenario executor

export function yourApi2Scenario() {
    yourApi2();
}

export function handleSummary(data) {

    // Custom terminal summary output

    console.log('\n========== RESULT ==========');

    for (const service of SERVICES) {

        console.log(`\n[${service.toUpperCase()}]`);

        console.log(
            `OK: ${
                data.metrics[`${service}_ok`]
                    ?.values.count || 0
            }`
        );

        console.log(
            `AUTH_FAIL: ${
                data.metrics[`${service}_auth_fail`]
                    ?.values.count || 0
            }`
        );

        console.log(
            `CLIENT_FAIL: ${
                data.metrics[`${service}_client_fail`]
                    ?.values.count || 0
            }`
        );

        console.log(
            `SERVER_FAIL: ${
                data.metrics[`${service}_server_fail`]
                    ?.values.count || 0
            }`
        );
    }

    return {};
}