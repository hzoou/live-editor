const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { inclusionTransform, merge } = require('./ot/otAlgorithm');
const opParser = require('./ot/operationParser');

const rooms = {};

io.on('connection', socket => {
    socket.emit('connectted');
    socket.on('joinRoom', (room, init) => {
        console.log(`${socket.id}: join room ${room}`);
        if (!rooms[room]) {
            rooms[room] = {};
            rooms[room]['content'] = init;
            const op = opParser('', init);
            op.unshift({
                operator: 'timestamp',
                value: Date()
            });
            rooms[room]['history'] = [];
            rooms[room]['history'].push(op);
        }
        socket.join(room);
    });
    socket.on('change', value => {
        console.log(value);
        const roomName = 'basiltoast';
        const history = rooms[roomName].history;
        const oldOp = history[history.length - 1];
        const newOp = inclusionTransform(value, oldOp);
        history.push(newOp);
        const content = merge(newOp, rooms[roomName].content);
        rooms[roomName].content = content;
        // socket.broadcast.to(roomName).emit('change', socket.id, newOp);
        console.log(content);
        io.sockets.in(roomName).emit('change', socket.id, content);
    });
});

server.listen(3030, () => {
    console.log('Socket IO server listening on port 3030');
});
