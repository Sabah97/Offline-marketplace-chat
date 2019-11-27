
var http = require("http");
const express = require("express");
const app = express();
const server = http.Server(app);

var io = require('socket.io')(server);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./view'))

app.get('/home', function(req, res){
    res.sendFile(__dirname + '/cart.html');
  });

//  io.on('connection', function(socket){
//   console.log('a user connected');

// });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message',msg);
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

// io.on('connection', function(socket){
//   socket.broadcast.emit('hi');
// });

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });
  server.listen(3000, function(){
    console.log('listening on *:3000');
  });