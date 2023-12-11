"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path = require('path');
const fs = require('fs'); //file system
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
const taskRoutes = require("./routs/taskRoutes");
app.use("/api/data", taskRoutes);
//server port
app.listen(8000, () => {
    console.log('Server listening on port 8000');
});
