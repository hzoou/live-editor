const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {

});

server.listen(3030, () => {
    console.log('Socket IO server listening on port 3030');
});