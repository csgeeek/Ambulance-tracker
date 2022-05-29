const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    }
});
  
io.on('connection', (socket) => {
    console.log(`New client connected ${socket.id}`);
    socket.on('send-coords', (data) => {
        const parsedData = JSON.parse(data);
        const reciever = parsedData.reciever;
        // socket.broadcast.emit('send-message', msg);
        socket.to(reciever).emit('send-message', data);
        console.log(`${parsedData.sender} ${parsedData.reciever} ${parsedData.lat} ${parsedData.lon}`);
    })
});

httpServer.listen(3000);