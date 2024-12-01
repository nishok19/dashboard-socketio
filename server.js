const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mockData = require("./data.json");
const { randomizeDashboardData } = require("./random");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Send real-time updates every 5 seconds
  const interval = setInterval(async () => {
    console.log("randzz - ", randomizeDashboardData(mockData)?.widgets?.[5]);
    const data = await randomizeDashboardData(mockData);
    socket.emit("update", data);
    console.log(`Data sent to client ${socket.id}:`, "actualdata");
  }, 5000);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    clearInterval(interval);
  });
});

//
app.get("/", (req, res) => {
  console.log("Wlecome");
  res.send("Socket.IO server is running!");
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
