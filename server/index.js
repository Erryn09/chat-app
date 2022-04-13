const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { isObject } = require("util");
const { join } = require("path");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, " has Connected!");

  socket.on("join-room", (username, roomID) => {
    socket.join(roomID);
    console.log(username, " joined Room ", roomID);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomID).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, " has Disconnected!");
  });
});

server.listen(9000, () => {
  console.log("Server is Running!!!");
});
