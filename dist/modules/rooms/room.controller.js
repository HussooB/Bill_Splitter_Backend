"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomByIdHandler = exports.joinRoomHandler = exports.getRoomsHandler = exports.createRoomHandler = void 0;
const roomService = __importStar(require("./room.service"));
// Create a room
const createRoomHandler = async (req, res) => {
    const userId = req.userId; // now typed
    const { title, menu } = req.body;
    try {
        const room = await roomService.createRoom(userId, title, menu); // ! if you are sure it's always present
        res.status(201).json({ room, roomLink: `/rooms/${room.id}` });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create room", error: err.message });
    }
};
exports.createRoomHandler = createRoomHandler;
// Get rooms for current user
const getRoomsHandler = async (req, res) => {
    const userId = req.userId;
    try {
        const rooms = await roomService.getRoomsForUser(userId);
        res.json({ rooms });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch rooms", error: err.message });
    }
};
exports.getRoomsHandler = getRoomsHandler;
// Join a room
const joinRoomHandler = async (req, res) => {
    const userId = req.userId;
    const { roomId } = req.body;
    try {
        const room = await roomService.joinRoom(roomId, userId);
        res.json({ room });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to join room", error: err.message });
    }
};
exports.joinRoomHandler = joinRoomHandler;
// Get room by ID
const getRoomByIdHandler = async (req, res) => {
    const { roomId } = req.params;
    try {
        const room = await roomService.getRoomById(roomId);
        if (!room)
            return res.status(404).json({ message: "Room not found" });
        res.json({ room });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch room", error: err.message });
    }
};
exports.getRoomByIdHandler = getRoomByIdHandler;
