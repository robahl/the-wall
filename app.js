const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3030;

let wallMessage = 'The Wall'

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

server.listen(port);

io.on('connection', function (socket) {
  socket.emit('server-message', { message: wallMessage });
  socket.on('client-message', function (data) {
    wallMessage = data.message;
    socket.broadcast.emit('server-message', { message: wallMessage });
  });
});
