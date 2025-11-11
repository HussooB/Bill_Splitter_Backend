import app from "./app"; // ts-node can resolve .ts automatically
import http from "http";
import { Server } from "socket.io";
import { PORT, REDIS_URL } from "./config/env"; // make sure REDIS_URL is in your env
import roomEvents from "./sockets/room.events";

import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

const startServer = async () => {
  // Create HTTP server from Express app
  const server = http.createServer(app);

  // Attach Socket.IO
  const io = new Server(server, {
    cors: {
      origin: "*", // you can replace with your frontend URL
      methods: ["GET", "POST"],
    },
  });

  // --- Redis Adapter Setup ---
  const pubClient = createClient({ url: REDIS_URL });
  const subClient = pubClient.duplicate();

  await Promise.all([pubClient.connect(), subClient.connect()]);

  io.adapter(createAdapter(pubClient, subClient));
  // -----------------------------

  // Load your socket events
  roomEvents(io);

  // Start server
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

// Start everything
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
