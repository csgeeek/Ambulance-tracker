const PORT = process.env.PORT || 5000;

const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, () => console.log('connected to DB'));

const io = require('socket.io')(server, { cors: { origin: "*" } });


// MIDDLEWARES
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/Auth.js');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

server.listen(PORT, () => console.log(`socket server listening on port ${PORT}`));
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