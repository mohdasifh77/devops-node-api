const express = require('express');
const router = express.Router();
const os = require('os');

// GET /api/system
router.get('/', (req, res) => {
  const totalMem = os.totalmem();
  const freeMem  = os.freemem();
  const usedMem  = totalMem - freeMem;

  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    arch:     os.arch(),
    cpus:     os.cpus().length,
    memory: {
      total:      formatBytes(totalMem),
      used:       formatBytes(usedMem),
      free:       formatBytes(freeMem),
      percentUsed: Math.round((usedMem / totalMem) * 100)
    },
    loadAvg:  os.loadavg(),
    uptime:   formatUptime(os.uptime()),
    nodeVersion: process.version,
    pid: process.pid
  });
});

function formatBytes(bytes) {
  const gb = bytes / (1024 ** 3);
  if (gb >= 1) return `${gb.toFixed(2)} GB`;
  return `${(bytes / (1024 ** 2)).toFixed(2)} MB`;
}

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}

module.exports = router;
