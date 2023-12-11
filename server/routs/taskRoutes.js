"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tasks_controller_1 = require("../services/tasks.controller");
router.get('/', tasks_controller_1.getAllTask);
router.put('/', tasks_controller_1.UpdateAllTasks);
module.exports = router;
