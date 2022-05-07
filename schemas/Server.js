const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
// const socketIO = require("../utils/Socketio");
const { connectDB } = require("../database/Config");
const Cites = require("../routes/Cites");
const Auth = require("../routes/Auth");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server);
    this.dbConnection();
    this.middlewares();
    this.SocketIo();
    this.routes();
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
  async dbConnection() {
    await connectDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/cites", Cites);
    this.app.use("/api/auth", Auth);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`http://localhost:${this.port}/ 🤪`);
    });
  }
}

module.exports = Server;
