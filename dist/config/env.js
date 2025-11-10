"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.PORT = exports.JWT_SECRET = void 0;
// src/config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET || "supersecret";
exports.PORT = process.env.PORT || 5000;
exports.DATABASE_URL = process.env.DATABASE_URL;
