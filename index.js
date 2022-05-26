const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
//using cors and socket io
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 3010;

app.get("/", (req, res) => {
  res.send("Running");
});
//connect
io.on("connection", socket => {
  socket.emit("me", socket.id);
  //disconnect video
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
  //call user
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  //answers the call
  socket.on("answerCall", data => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

//start the server
server.listen(PORT, () =>
  console.log(`DEVS VIDEO Server is running on port ${PORT}`)
);
