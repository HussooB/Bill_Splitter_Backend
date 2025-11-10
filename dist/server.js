"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // ts-node can resolve .ts automatically
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const env_1 = require("./config/env");
const room_events_1 = __importDefault(require("./sockets/room.events"));
// Create HTTP server from Express app
const server = http_1.default.createServer(app_1.default);
// Attach Socket.io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // or your frontend URL
        methods: ["GET", "POST"],
    },
});
// Load socket events
(0, room_events_1.default)(io);
// Start server
server.listen(env_1.PORT, () => console.log(`Server running on port ${env_1.PORT}`));
