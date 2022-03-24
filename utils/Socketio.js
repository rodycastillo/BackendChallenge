const socketIO = (socket) => {
  let name;
  socket.on("connect", (nomb) => {
    name = nomb;

    socket.broadcast.emit("messages", {
      name,
      mensaje: `${name} has entered the chat room.`,
    });
  });

  socket.on("message", (name, message) => {
    io.emit("messages", { name, message });
  });

  socket.on("disconnect", () => {
    io.emit("messages", {
      servidor: "Server",
      mensaje: `${nombre} has left the chat room.`,
    });
  });
};

module.exports = socketIO;
