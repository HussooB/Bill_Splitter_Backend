"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProofs = exports.createProof = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const createProof = async (roomId, userId, fileUrl) => {
    return client_1.default.paymentProof.create({
        data: { roomId, senderId: userId, fileUrl },
        include: { sender: true },
    });
};
exports.createProof = createProof;
const getProofs = async (roomId) => {
    return client_1.default.paymentProof.findMany({
        where: { roomId },
        include: { sender: true },
        orderBy: { createdAt: "asc" },
    });
};
exports.getProofs = getProofs;
