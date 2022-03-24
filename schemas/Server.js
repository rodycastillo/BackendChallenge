const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const socketIO = require("../utils/Socketio");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server);

    this.middlewares();
    this.SocketIo();
    this.listen();
  }

  SocketIo() {
    this.io.on("connection", (socket) => {
      let name;
      socket.on("connect", (nomb) => {
        name = nomb;

        socket.broadcast.emit("messages", {
          name,
          message: `${name} has entered the chat room.`,
        });
      });

      socket.on("message", (name, message) => {
        io.emit("messages", { name, message });
      });

      socket.on("disconnect", () => {
        io.emit("messages", {
          server: "Server",
          message: `${nombre} has left the chat room.`,
        });
      });
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log(`http://localhost:${this.port}/ 🤪`);
    });
  }
}

module.exports = Server;
