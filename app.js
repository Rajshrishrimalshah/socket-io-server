const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;

// next line is the money
const index = require("./routes/index");

const app = express();

app.use('/api', index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting
app.set('socketio', io);

io.on("connection", socket => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
