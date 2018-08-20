const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
// port 
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
// websocket server 
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('someone connected');


   

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        // emmit function all 
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

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






