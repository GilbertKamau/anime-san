const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { requestCounter, requestHistogram, register } = require('./metrics');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Quote endpoint — fetches from AnimeChan public API
app.get('/api/quotes', async (req, res) => {
  const start = Date.now();
  requestCounter.inc();

  try {
    const response = await axios.get('https://api.animechan.io/v1/quotes/random');
    const duration = (Date.now() - start) / 1000;
    requestHistogram.observe(duration);

    const quoteData = response.data?.data;

    if (!quoteData) {
      throw new Error('Invalid response structure');
    }

    const payload = {
      quote: quoteData.content,
      anime: quoteData.anime.name,
      character: quoteData.character.name,
      source: 'animechan.io'
    };

    res.json(payload);
  } catch (err) {
    const duration = (Date.now() - start) / 1000;
    requestHistogram.observe(duration);
    console.error('Failed to fetch quote:', err.message || err);
    res.status(502).json({ error: 'Failed to fetch quote from upstream' });
  }
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
});

app.listen(PORT, () => console.log(`✅ Backend listening on port ${PORT}`));
