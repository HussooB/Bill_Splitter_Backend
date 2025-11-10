"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.createMessage = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const createMessage = async (roomId, userId, text) => {
    return client_1.default.message.create({
        data: { roomId, senderId: userId, text },
        include: { sender: true }
    });
};
exports.createMessage = createMessage;
const getMessages = async (roomId) => {
    return client_1.default.message.findMany({
        where: { roomId },
        include: { sender: true },
        orderBy: { createdAt: "asc" }
    });
};
exports.getMessages = getMessages;
