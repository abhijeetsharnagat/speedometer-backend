const Speed = require('../models/Speed');

exports.getSpeed = async (req, res) => {
  try {
    const speeds = await Speed.find().sort({ timestamp: -1 }).limit(10);
    res.json(speeds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.postSpeed = async (req, res) => {
  const { speed } = req.body;

  if (!speed) {
    return res.status(400).json({ error: 'Speed is required' });
  }

  try {
    const newSpeed = new Speed({ speed });
    await newSpeed.save();

    // Notify clients about the new speed
    io.emit('newSpeed', newSpeed);

    res.json(newSpeed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateSpeed = async (req, res) => {
  const { speed } = req.body;

  if (!speed) {
    return res.status(400).json({ error: 'Speed is required' });
  }

  try {
    const newSpeed = new Speed({ speed });
    await newSpeed.save();

    // Notify clients about the updated speed
    io.emit('updateSpeed', newSpeed);

    res.json(newSpeed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
