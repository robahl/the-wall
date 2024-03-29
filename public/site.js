var messageDiv = document.getElementById('message');

var socket = io.connect(location.origin, {timeout: 5000});
socket.on('server-message', function (data) {
  messageDiv.innerHTML = data.message;
});

messageDiv.addEventListener('input', function (event) {
  var message = event.target.innerHTML;
  socket.emit('client-message', {message: message})
});
