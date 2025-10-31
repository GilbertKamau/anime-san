const client = require('prom-client');


// Create a registry so we can export metrics
const register = new client.Registry();


// Default metrics (node process metrics)
client.collectDefaultMetrics({ register });


// Custom counter - total requests to /api/quote
const requestCounter = new client.Counter({
name: 'api_requests_total',
help: 'Total number of requests received by /api/quote',
});


// Histogram for request duration
const requestHistogram = new client.Histogram({
name: 'api_request_duration_seconds',
help: 'Duration of /api/quote requests in seconds',
buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});


register.registerMetric(requestCounter);
register.registerMetric(requestHistogram);


module.exports = { register, requestCounter, requestHistogram };