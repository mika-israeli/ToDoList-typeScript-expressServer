const path = require("path");
const fs = require("fs");
import express from "express";
const router = express.Router();

interface serverErorr extends Error {
  status?: number;
  message: string;
}

export const getAllTask = (req: express.Request, res: express.Response) => {
  // read the data.json file
  const filePath = path.join(__dirname, "..", "data.json");
  fs.readFile(filePath, "utf8", (err: serverErorr, data: string) => {
    if (err) {
      if (err.message === "ENOENT") {
        // File not found, initialize with an empty array
        console.warn("data.json not found, initializing with an empty array.");
        res.json([]);
      } else {
        console.error("Error reading data.json:", err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      try {
        // Parse the JSON data and send it as a respons to the client
        const jsonData = JSON.parse(data);
        return res.json(jsonData);
      } catch (parseError) {
        console.error("Error parsing data.json:", parseError);
        res.status(400).json({ message: "Internal Server Error" });
      }
    }
  });
};
//update the data with the new or update tasks
export const UpdateAllTasks = (req: express.Request, res: express.Response) => {
  const filePath = path.join(__dirname, "..", "data.json");
  const updatedData = req.body; //the new data

  // validate the incoming data
  if (!Array.isArray(updatedData)) {
    console.error("Error: Updated data is not an array");
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  // directly write the updated data to data.json, replacing the existing data with the new data
  fs.writeFile(
    filePath,
    JSON.stringify(updatedData),
    "utf8",
    (writeErr: serverErorr | null) => {
      if (writeErr) {
        console.error("Error writing to data.json:", writeErr);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.json({ success: true });
      }
    }
  );
};
