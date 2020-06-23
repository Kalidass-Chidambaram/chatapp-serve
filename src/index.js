const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const { on } = require('process');
const io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected to chat');
    socket.on('join', function(data){
        socket.join(data.connectionType);
        console.log(data.userId + 'connected to chat');
    })

    socket.on('message', function(data){
        console.log('new message' + data.userId + 'mess' + data.message + data.connectionType)
        io.in(data.connectionType).emit('new message', { userId: data.userId, message: data.message});
    })
});


server.listen(port, () => {
    console.log(`started on port: ${port}`);
});