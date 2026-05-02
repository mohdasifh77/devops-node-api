const express = require('express');
const router = express.Router();
const os = require('os');

const START_TIME = Date.now();

// GET /api/health
router.get('/', (req, res) => {
  const uptimeMs = Date.now() - START_TIME;
  const uptimeSec = Math.floor(uptimeMs / 1000);

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: uptimeSec,
      human: formatUptime(uptimeSec)
    },
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    node: process.version
  });
});

// GET /api/health/live  (Kubernetes liveness probe)
router.get('/live', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

// GET /api/health/ready  (Kubernetes readiness probe)
router.get('/ready', (req, res) => {
  res.status(200).json({ status: 'ready' });
});

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}

module.exports = router;
