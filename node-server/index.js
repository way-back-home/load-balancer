import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const projectRoot = path.resolve(__dirname, "..");
const logsDir = path.join(projectRoot, "logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const COMBINED_LOG_FILE = path.join(logsDir, "requests.log");
const LOCAL_LOG_FILE = path.join(logsDir, "node_request.log");

app.use((req, res, next) => {
  const logLine = `${new Date().toISOString()} - [Node] ${req.method} ${
    req.url
  } from ${req.ip}\n`;

  console.log("Logging:", logLine);

  fs.appendFile(COMBINED_LOG_FILE, logLine, (err) => {
    if (err) console.error("Failed to write combined log:", err);
  });

  fs.appendFile(LOCAL_LOG_FILE, logLine, (err) => {
    if (err) console.error("Failed to write local node log:", err);
  });

  next();
});

app.get("/api/hello", (req, res) => {
  res.send("Hello from Node!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Node listening on port ${port}`));
