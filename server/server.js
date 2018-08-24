const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


// message util
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
// port 
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
// websocket server 
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('someone connected');

    // socket.emit from Admin text welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));



    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
    
        // emmit function all 
        io.emit('newMessage', generateMessage( message.from, message.text));
        callback('this is from sever');

    });



    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));

    });

    // disconnection function 
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

});






app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server Running!!! ${port}`);
});






