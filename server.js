const server = require('http').createServer();
const io = require('socket.io')(server);

const PORT = 3000;

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('ready', () => {
        console.log('Player ready', socket.io);

        readyPlayerCount++;

        if (readyPlayerCount === 2) {
            io.emit('startGame', socket.id);
        }
    });

    socket.on('paddleMove', (paddleData) => {
        socket.broadcast.emit('paddleMove', paddleData);
    });
})