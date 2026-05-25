/*
|--------------------------------------------------------------------------
| Metrics Module
|--------------------------------------------------------------------------
|
| Custom k6 metrics utilities.
|
| Responsible for:
| - metric creation
| - status counters
| - metrics aggregation
|
*/

import { Counter } from 'k6/metrics';

// Stores already created metrics to avoid duplication

const registry = {};

// Creates custom counters for service metrics

export function createMetrics(service) {

    // Returns existing metrics if already initialized

    if (registry[service]) {
        return registry[service];
    }

    // Converts service name to metric prefix

    const name = service.toLowerCase();

    // Creates status-based counters

    registry[service] = {

        ok:
            new Counter(`${name}_ok`),

        auth:
            new Counter(`${name}_auth_fail`),

        client:
            new Counter(`${name}_client_fail`),

        server:
            new Counter(`${name}_server_fail`),
    };

    return registry[service];
}

// Updates counters based on response status

export function updateMetrics(metrics, status) {

    // Successful responses

    if (status >= 200 && status < 300) {

        metrics.ok.add(1);

        return;
    }

    // Authorization failures

    if (status === 401 || status === 403) {

        metrics.auth.add(1);

        return;
    }

    // Client-side failures

    if (status >= 400 && status < 500) {

        metrics.client.add(1);

        return;
    }

    // Server-side failures

    if (status >= 500) {

        metrics.server.add(1);
    }
}