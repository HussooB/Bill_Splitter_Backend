import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { PORT, REDIS_URL } from "./config/env";
import roomEvents from "./sockets/room.events";

import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

const startServer = async () => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*", // or your frontend URL
      methods: ["GET", "POST"],
    },
  });

  // --- Redis Adapter Setup ---
  const pubClient = createClient({ url: REDIS_URL });
  const subClient = pubClient.duplicate();

  pubClient.on("error", (err) => console.error("Redis Pub Error:", err));
  subClient.on("error", (err) => console.error("Redis Sub Error:", err));

  await Promise.all([pubClient.connect(), subClient.connect()]);
  console.log("✅ Redis connected");

  io.adapter(createAdapter(pubClient, subClient));
  console.log("✅ Socket.IO Redis adapter enabled");

  // Load your socket events
  roomEvents(io);

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer().catch((err) => console.error("Failed to start server:", err));
