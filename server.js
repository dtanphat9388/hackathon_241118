var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const _ = require('lodash');

app.use(express.static('.'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


let sourceText = '';

io.on('connection', function(socket){
  socket.emit('init', "hello")
  io.emit('newConnect', Object.keys(io.sockets.connected))

  socket.on('typing', text => {
    sourceText = text;
    io.emit('typing', sourceText)
  })

  socket.on('disconnect', () => {
    io.emit('updateList', socket.id)
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});