"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomById = exports.joinRoom = exports.getRoomsForUser = exports.createRoom = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const createRoom = async (userId, title, menu) => {
    const room = await client_1.default.room.create({
        data: {
            title,
            creatorId: userId,
            menu: {
                create: menu
            }
        },
        include: {
            menu: true,
            participants: true
        }
    });
    return room;
};
exports.createRoom = createRoom;
const getRoomsForUser = async (userId) => {
    const rooms = await client_1.default.room.findMany({
        where: {
            OR: [
                { creatorId: userId },
                { participants: { some: { id: userId } } }
            ]
        },
        include: {
            participants: true,
            menu: true
        }
    });
    return rooms;
};
exports.getRoomsForUser = getRoomsForUser;
const joinRoom = async (roomId, userId) => {
    const room = await client_1.default.room.update({
        where: { id: roomId },
        data: {
            participants: {
                connect: { id: userId }
            }
        },
        include: {
            participants: true,
            menu: true
        }
    });
    return room;
};
exports.joinRoom = joinRoom;
const getRoomById = async (roomId) => {
    const room = await client_1.default.room.findUnique({
        where: { id: roomId },
        include: {
            participants: true,
            menu: true,
            messages: true,
            proofs: true,
            creator: true
        }
    });
    return room;
};
exports.getRoomById = getRoomById;
