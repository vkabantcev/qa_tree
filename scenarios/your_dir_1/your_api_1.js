/*
|--------------------------------------------------------------------------
| Scenario Check
|--------------------------------------------------------------------------
|
| API monitoring scenario used for:
| - endpoint availability checks
| - response logging
| - metrics collection
|
*/

import { get } from '../../core/request.js';

import { logResponse } from '../../core/logger.js';

import {
    createMetrics,
    updateMetrics,
} from '../../core/metrics.js';

import { URLS } from '../../config/urls.js';

// Service name for logs and metrics

const SERVICE = 'your_api_1';

// Custom k6 metrics for current scenario

const metrics = createMetrics(SERVICE);

export function yourApi1() {

    // API request execution

    const response = get(
        `${URLS.INSURTECH}/api/v1/your_endpoint`
    );

    // Console response logging

    logResponse(SERVICE, response);

    // Metrics update based on response status

    updateMetrics(metrics, response.status);
}