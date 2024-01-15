// speedSocket.js
module.exports = (io) => {
  const middleware = (req, res, next) => {
    next();
  };

  io.on('connection', (socket) => {
    console.log('Client connected');

    // Optionally, you can emit a message to the client when they connect
    socket.emit('connected', 'You are connected!');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return middleware;
};
