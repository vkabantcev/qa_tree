/*
|--------------------------------------------------------------------------
| Request Module
|--------------------------------------------------------------------------
|
| Shared HTTP request wrapper.
|
| Responsible for:
| - sending requests
| - applying common headers
| - request configuration
|
*/

// core/request.js

import http from 'k6/http';

import { TOKEN } from '../config/env.js';

// Default timeout for all requests

const DEFAULT_TIMEOUT = '5s';

// Shared headers for all requests

const BASE_HEADERS = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
};

// Builds final request configuration

function buildParams(customHeaders = {}, params = {}) {

    return {
        timeout: DEFAULT_TIMEOUT,

        ...params,

        headers: {
            ...BASE_HEADERS,
            ...customHeaders,
        },
    };
}

// GET request wrapper

export function get(
    url,
    customHeaders = {},
    params = {},
) {

    return http.get(
        url,
        buildParams(customHeaders, params),
    );
}

// POST request wrapper

export function post(
    url,
    body,
    customHeaders = {},
    params = {},
) {

    return http.post(
        url,
        JSON.stringify(body),

        buildParams(customHeaders, params),
    );
}

// PUT request wrapper

export function put(
    url,
    body,
    customHeaders = {},
    params = {},
) {

    return http.put(
        url,
        JSON.stringify(body),

        buildParams(customHeaders, params),
    );
}

// DELETE request wrapper

export function del(
    url,
    customHeaders = {},
    params = {},
) {

    return http.del(
        url,
        null,

        buildParams(customHeaders, params),
    );
}