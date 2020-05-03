//Require the express module
const express = require("express");

//create a new express application
const app = express()

//database connection
const  Chat  = require("./models/chatSchema");
const  connect  = require("./dbConnection");

//require the http module
const http = require("http").Server(app)

// require the socket.io module
const io = require("socket.io");

const port = 5000;

const socket = io(http);
//create an event listener

//To listen to messages
socket.on("connection", (socket) => {
    console.log("User connected");
    socket.on("disconnect", ()=>{
        console.log("Disconnected");
    })
});

//wire up the server to listen to our port 5000
http.listen(port, () => {
    console.log("connected to port: " + port)
});

socket.on("chat message", function (msg) {
    console.log("message: " + msg);
    //broadcast message to everyone in port:5000 except yourself.
    socket.broadcast.emit("received", { message: msg });
});