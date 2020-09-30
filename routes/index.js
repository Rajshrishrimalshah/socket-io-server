const express = require("express");
const axios = require("axios");

const router = express.Router();

const getApiAndEmit = async (socket) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${
        Math.floor(Math.random() * 100) + 1
      }`
    ); // Getting the data from DarkSky

    socket.emit("FromAPI", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

router.get("/", (req, res) => {
  console.log("api executed ****************");
  let interval;

  var io = req.app.get("socketio");

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(io), 2000);

  // res.send({ response: "I am alive" }).status(200);
});

module.exports = router;

// io.on("connection", (socket) => {
  // console.log("New client connected");
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 10000);
  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  // });
// });
