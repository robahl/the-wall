const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const redis = require('redis');

const client = redis.createClient();

const port = process.env.PORT || 3030;

app.enable('trust proxy');

if (process.env.NODE_ENV === 'production') {
  app.use(require('morgan')('combined'));
}

// END SETUP

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

server.listen(port);

client.setnx('wall-message', 'The Wall with Redis');

io.on('connection', function (socket) {
  client.get('wall-message', (err, reply) => {
    wallMessage = reply;
    socket.emit('server-message', { message: wallMessage });
  });

  socket.on('client-message', function (data) {
    client.set('wall-message', data.message);
    socket.broadcast.emit('server-message', { message: data.message });
  });
});
