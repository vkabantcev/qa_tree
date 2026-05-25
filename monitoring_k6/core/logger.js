/*
|--------------------------------------------------------------------------
| Logger Module
|--------------------------------------------------------------------------
|
| Console logging utilities for k6 scenarios.
|
| Responsible for:
| - formatted logs
| - status highlighting
| - response output
|
*/

// ANSI console colors for terminal output

const COLORS = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

// Returns console color based on HTTP status

function getColor(status) {

    if (status >= 200 && status < 300) {
        return COLORS.green;
    }

    if (status === 401 || status === 403) {
        return COLORS.yellow;
    }

    if (status >= 400 && status < 500) {
        return COLORS.magenta;
    }

    if (status >= 500) {
        return COLORS.red;
    }

    return COLORS.cyan;
}

// Returns readable status label for logs

function getLabel(status) {

    if (status >= 200 && status < 300) {
        return 'SUCCESS';
    }

    if (status === 401 || status === 403) {
        return 'AUTH_FAIL';
    }

    if (status >= 400 && status < 500) {
        return 'CLIENT_FAIL';
    }

    if (status >= 500) {
        return 'SERVER_FAIL';
    }

    return 'UNKNOWN';
}

// Logs successful request execution result

export function logResponse(service, response) {

    const status = response.status;

    const color = getColor(status);

    const label = getLabel(status);

    console.log(
        `${color}[${service}] ${label} | status=${status} | duration=${response.timings.duration}ms${COLORS.reset}`
    );
}

// Logs unexpected execution errors

export function logError(service, error) {

    console.log(
        `${COLORS.red}[${service}] EXCEPTION | ${error}${COLORS.reset}`
    );
}