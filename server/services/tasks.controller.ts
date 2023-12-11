const path = require("path");
const fs = require("fs");
import express from "express";
const router = express.Router();

interface serverErorr extends Error {
  status?: number;
  message: string;
}

enum errorTypes {
  ENONET = "ENONET",
}

export const getAllTask = (req: express.Request, res: express.Response) => {
  // read the data.json file
  const filePath = path.join(__dirname, "..", "data.json");
  fs.readFile(filePath, "utf8", (err: serverErorr, data: string) => {
    //cant reat or acsess to data.json
    if (err) {
      //cant acsess to the data.json
      if (err.message === errorTypes.ENONET) {
        // File not found, initialize with an empty array
        console.warn(
          "data.json not found no such file or directory, initializing with an empty array."
        );
        res.json([]);
        //cant reat the data.json
      } else {
        console.error("Error reading data.json:", err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      try {
        // Parse the JSON data fron data.js file into js object and send it as a respons to the client
        const jsonData = JSON.parse(data);
        return res.json(jsonData);
        //cant parse the json file
      } catch (parseError) {
        console.error("Error parsing data.json:", parseError);
        res.status(400).json({ message: "Internal Server Error" });
      }
    }
  });
};

//update the data with the newtasks or update tasks
export const UpdateAllTasks = (req: express.Request, res: express.Response) => {
  const filePath = path.join(__dirname, "..", "data.json");
  const updatedData = req.body; //the new data

  // validate the incoming data the data supost to be an array
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
    (writeErr: serverErorr) => {
      if (writeErr) {
        console.error("Error writing to data.json:", writeErr);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.json({ success: true });
      }
    }
  );
};
