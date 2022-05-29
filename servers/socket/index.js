const PORT = process.env.PORT || 5000;

const express = require('express');

const socketIO = require('socket.io');


const server = express().listen(PORT, () => console.log(`socket on ${PORT}`));


const io = socketIO(server, {
  cors: {
    origin: "*"
  }
});

let sid = '';

io.on('connection', (socket) => {
  console.log('Client connected');

  let uniqId = '';
  socket.on('send-id', (data) => {
    sid = data;
  });

  socket.on('send-coords', (data) => {
    const parsedData = JSON.parse(data);
    uniqId = parsedData.id;
    socket.to(sid).emit('reply', data);
  });

  socket.on('disconnect', () => {
    socket.to(sid).emit('disconnect-client', uniqId);
  });
});