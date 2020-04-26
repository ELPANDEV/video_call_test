var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/stream.html', (req, res) => {
  res.sendFile(`${__dirname}/public/stream.html`);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('stream', (image) => {
    socket.broadcast.emit('stream', image);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});