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
exports.getMessages = exports.postMessage = void 0;
const messageService = __importStar(require("./message.service"));
// Post a new message
const postMessage = async (req, res) => {
    const userId = req.userId;
    const { roomId } = req.params;
    const { text } = req.body;
    try {
        const message = await messageService.createMessage(roomId, userId, text);
        res.status(201).json({ message });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to send message", error: err.message });
    }
};
exports.postMessage = postMessage;
// Get all messages for a room
const getMessages = async (req, res) => {
    const { roomId } = req.params;
    try {
        const messages = await messageService.getMessages(roomId);
        res.json({ messages });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch messages", error: err.message });
    }
};
exports.getMessages = getMessages;
