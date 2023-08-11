import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";

const app = express();
app.use(cors());

app.get("/api/csv", async (req, res) => {
  try {
    const currentFileUrl = new URL(import.meta.url);
    const currentDir = path.dirname(currentFileUrl.pathname);

    const csvFilePath = path.join(currentDir, "/data/orders.csv");
    const csvData = await fs.readFile(csvFilePath, "utf-8");
    res.send(csvData);
  } catch (error) {
    console.error("Error reading CSV:", error);
    res.status(500).send("Internal Server Error");
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
