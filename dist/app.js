"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const room_route_1 = __importDefault(require("./modules/rooms/room.route"));
const proof_route_1 = __importDefault(require("./modules/proofs/proof.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.default);
app.use("/api/rooms", room_route_1.default);
app.use("/api/proofs", proof_route_1.default);
exports.default = app;
