"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const signup = async (email, password, name) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await client_1.default.user.create({
        data: { email, password: hashedPassword, name },
    });
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, env_1.JWT_SECRET, { expiresIn: "7d" });
    return { user, token };
};
exports.signup = signup;
const login = async (email, password) => {
    const user = await client_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("User not found");
    const valid = await bcrypt_1.default.compare(password, user.password);
    if (!valid)
        throw new Error("Invalid password");
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, env_1.JWT_SECRET, { expiresIn: "7d" });
    return { user, token };
};
exports.login = login;
