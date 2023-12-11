import express from "express";
const app = express();
const path = require("path");
const fs = require("fs"); //file system
const cors = require("cors");
app.use(express.json());
app.use(cors());
const taskRoutes = require("./routs/taskRoutes");

app.use("/api/data", taskRoutes);

//server port
app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
