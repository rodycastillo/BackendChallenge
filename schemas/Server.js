const express = require("express");
const cors = require("cors");
const http = require("http");
const logger = require('morgan')
const socketio = require("socket.io");
// const socketIO = require("../utils/Socketio");
const { connectDB } = require("../database/Config");
const Cites = require("../routes/Cites");
const Auth = require("../routes/Auth");
const Message = require("../routes/Message");
const multer = require("multer");
const { storage } = require("../helpers/uploadImage");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });
    this.dbConnection();
    this.middlewares();
    this.SocketIo();
    this.routes();
    this.listen();
  }

  SocketIo() {
    this.io.on("connection", (socket) => {
      let global = {
        onlineUsers: new Map(),
        chatSocket
      }

      global.chatSocket = socket;

      socket.on("add-user", (userId) => {
        global.onlineUsers.set(userId, socket.id);
      });
    
      socket.on("send-msg", (data) => {
        const sendUserSocket = global.onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
      });
      // let name;
      // socket.on("connect", (nomb) => {
      //   name = nomb;

      //   socket.broadcast.emit("messages", {
      //     name,
      //     message: `${name} has entered the chat room.`,
      //   });
      // });

      // socket.on("message", (name, message) => {
      //   io.emit("messages", { name, message });
      // });

      // socket.on("disconnect", () => {
      //   io.emit("messages", {
      //     server: "Server",
      //     message: `${name} has left the chat room.`,
      //   });
      // });
    });
  }
  async dbConnection() {
    await connectDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(logger('tiny'));
    this.app.use(multer({storage}).single('image'));
  }

  routes() {
    // Static View
    this.app.use(express.static('public'))
    // Api routes
    this.app.use("/api/v1.0/cites", Cites);
    this.app.use("/api/v1.0/auth", Auth);
    this.app.use('/api/v1.0/chat', Message)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`http://localhost:${this.port}/ 🤪`);
    });
  }
}

module.exports = Server;
