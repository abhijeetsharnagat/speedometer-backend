const express = require('express');
const router = express.Router();
const speedController = require('../controllers/speedController');

// GET /api/speed
router.get('/', speedController.getSpeed);

// POST /api/speed
router.post('/', speedController.postSpeed);

// POST /api/speed/update
router.post('/update', speedController.updateSpeed);

module.exports = router;
