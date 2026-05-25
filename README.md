# QA_TREE

Lightweight API monitoring framework based on k6.

Designed for:
- endpoint availability checks
- synthetic monitoring
- smoke validation
- response logging
- custom metrics collection

---

# Project Structure

```text
QA_TREE/
│
├── config/
│   ├── env.js
│   ├── package.json
│   └── urls.js
│
├── core/
│   ├── logger.js
│   ├── metrics.js
│   └── request.js
│
├── runners/
│   ├── check.js
│   └── fast_check.js
│
├── scenarios/
│   ├── your_dir_1/
│   │   └── your_api_1.js
│   │
│   └── your_dir_2/
│       └── your_api_2.js
│
├── .env
├── .gitignore
└── README.md
```

---

# Installation

## Install dependencies

```bash
npm install
```

---

# Environment Variables

Create `.env` file:

```env
TOKEN=YOUR_TOKEN_HERE
```

---

# Available Runners

## check.js

Interval-based monitoring runner.

Suitable for:

* synthetic monitoring
* periodic API validation
* lightweight uptime checks

Execution strategy:

* constant-arrival-rate

Run:

```bash
npm run check
```

---

## fast_check.js

Fast single-execution runner.

Suitable for:

* smoke testing
* CI validation
* quick endpoint checks

Execution strategy:

* shared-iterations

Run:

```bash
npm run fast-check
```

---

# Core Modules

## request.js

Shared HTTP request wrapper.

Features:

* GET / POST / PUT / DELETE methods
* common headers
* authorization support
* timeout configuration

---

## logger.js

Console logging utilities.

Features:

* colored status output
* readable labels
* response duration logging
* exception logging

---

## metrics.js

Custom k6 metrics utilities.

Tracks:

* successful requests
* authorization failures
* client errors
* server errors

---

# Scenario Structure

Example scenario:

```javascript
export function yourApi1() {

    const response = get(
        `${URLS.INSURTECH}/api/v1/your_endpoint`
    );

    logResponse(SERVICE, response);

    updateMetrics(metrics, response.status);
}
```

---

# Thresholds

Global thresholds:

```javascript
http_req_failed:
    rate < 0.05

http_req_duration:
    p(95) < 2000
    avg < 1000
```

---

# Notes

* `.env` is ignored by git
* Tokens should never be committed
* Designed for reusable API monitoring scenarios
* Easy to scale with additional runners and scenarios

---

# Stack

```
* k6
* JavaScript
* dotenv-cli
```


