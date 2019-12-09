const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
    socket.emit("connectted");
    socket.on("joinRoom", room => {
        socket.join(room);
        console.log(`${socket.id}: join room ${room}`);
    });
    socket.on("change", (event, value) => {
        socket.broadcast.emit("change", event, value);
    });
});

server.listen(3030, () => {
    console.log("Socket IO server listening on port 3030");
});
