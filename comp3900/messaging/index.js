const express = require("express")
const app = express()
const socket = require("socket.io")
const cors = require("cors")

app.use(express())

const port = 5000;

app.use(cors());

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const io = socket(server, {
    cors: {
        origin: '*'
    }
})


io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("Must be a valid username"))
    }
    socket.username = username;
    next();
    console.log("Username set for " + username)
})

io.on("connection", (socket) => {
    // fetch existing users
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
        userID: id,
        username: socket.username,
        });
    }
    console.log(users)
    socket.emit("users", users);

    // notify existing users
    socket.broadcast.emit("user connected", users);

    socket.on("disconnect", () => {
        console.log('A user has disconnected: ' + socket.id);
        let connectedUsers = [...users]
        for (let i = 0; i < users.length; i++) {
            if (users[i].userID === socket.id) {
                connectedUsers.splice(i, 1);
            }
        }
        socket.broadcast.emit("user disconnected", connectedUsers);
    })

    socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
            content,
            from: socket.id
        })
    })
})