const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhijeetsharnagat200:<password>@speedometer.o4dzauv.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Speed model and schema (Speed.js)
const speedSchema = new mongoose.Schema({
  speed: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Speed = mongoose.model('Speed', speedSchema);

// Express middleware to parse JSON
app.use(express.json());

// Define route to get speed data
app.get('/api/speed', async (req, res) => {
  try {
    const speeds = await Speed.find().sort({ timestamp: -1 }).limit(10);
    res.json(speeds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route to store speed data
app.post('/api/speed', async (req, res) => {
  const { speed } = req.body;

  if (!speed) {
    return res.status(400).json({ error: 'Speed is required' });
  }

  try {
    const newSpeed = new Speed({ speed });
    await newSpeed.save();
    res.json(newSpeed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
