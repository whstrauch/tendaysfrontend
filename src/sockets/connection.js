import { io } from "socket.io-client";

const socket = io("https://tendaysbackend.onrender.com")

let socketId

socket.on("createGame", update => {
    console.log(update)
    socketId = update.socketId;
})

// Work on reconnect feature
// socket.on('reconnect', () => {
//     socket.emit('subscribe', 'theRoom')
// })

export {socket, socketId}