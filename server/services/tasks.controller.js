"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAllTasks = exports.getAllTask = void 0;
const path = require('path');
const fs = require('fs');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const getAllTask = (req, res) => {
    // read the data.json file
    const filePath = path.join(__dirname, '..', 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.message === 'ENOENT') {
                // File not found, initialize with an empty array
                console.warn('data.json not found, initializing with an empty array.');
                res.json([]);
            }
            else {
                console.error('Error reading data.json:', err);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        else {
            try {
                // Parse the JSON data and send it as a respons to the client
                const jsonData = JSON.parse(data);
                return res.json(jsonData);
            }
            catch (parseError) {
                console.error('Error parsing data.json:', parseError);
                res.status(400).json({ message: 'Internal Server Error' });
            }
        }
    });
};
exports.getAllTask = getAllTask;
const UpdateAllTasks = (req, res) => {
    const filePath = path.join(__dirname, '..', 'data.json');
    const updatedData = req.body; //the new data
    // validate the incoming data
    if (!Array.isArray(updatedData)) {
        console.error('Error: Updated data is not an array');
        res.status(400).json({ message: 'Bad Request' });
        return;
    }
    // directly write the updated data to data.json, replacing the existing data with the new data
    fs.writeFile(filePath, JSON.stringify(updatedData), 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing to data.json:', writeErr);
            res.status(500).json({ message: 'Internal Server Error' });
        }
        else {
            res.json({ success: true });
        }
    });
};
exports.UpdateAllTasks = UpdateAllTasks;
